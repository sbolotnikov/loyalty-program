import { useEffect, useState, useRef } from 'react';
import Layout from '../components/layout';
import tw from 'twrnc';
import useDimensions from '../hooks/useDimensions';
import { Audio } from 'expo-av';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import PlayerButtons from './svg/PlayerButtons';
import SettingsModal from './SettingsModal';
const music1 = require('../assets/music/kermit-happy-birthday.mp3');

const MusicPlayer = ({ rateSet, songDuration, startPos, music, onSongEnd }) => {
  const { dimensions } = useDimensions();
  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [Playing, SetPlaying] = useState(false);
  const [size, setSize] = useState(0);
  const [Duration, SetDuration] = useState(0);
  const [songDurationLocal, SetSongDurationLocal] = useState(songDuration);
  const [Value, SetValue] = useState(0);
  const [Rate, SetRate] = useState(rateSet);
  const [modalVisible, setModalVisible] = useState(false);
  const sound = useRef(new Audio.Sound());

  const timeToPlay = async (hours, minutes, seconds) => {
    let secondsLeft = hours * 3600 + minutes * 60 + seconds;
    if (seconds !== 0 || minutes !== 0 || hours !== 0) {
      let timerInterval = setInterval(async function () {
        secondsLeft--;
        if (seconds === 0) {
          seconds = 59;
        } else seconds--;
        if (seconds === 59) {
          if (minutes === 0) {
            minutes = 59;
            hours--;
          } else minutes--;
        }
        console.log(hours + ':' + minutes + ':' + seconds);
        if (secondsLeft === 0) {
          clearInterval(timerInterval);
          onSongEnd();
        }
      }, 1000);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const status = await sound.current.unloadAsync();
      SetValue(0);
      SetLoaded(false);
      SetPlaying(false);
      SetDuration(0);
      if (music !== '') {
        await LoadAudio();
        await PlayAudio();
      }
    }
    fetchData();
  }, [music]);
  useEffect(() => {
    setSize(
      dimensions.width > 1000
        ? 140
        : dimensions.width >= 700
        ? 100
        : dimensions.width > 500
        ? 80
        : 40
    );
  }, []);

  const UpdateStatus = async (data) => {
    console.log(songDurationLocal);
    try {
      if (data.didJustFinish) {
        ResetPlayer();
        onSongEnd();
      } else if (data.positionMillis) {
        if (data.durationMillis) {
          SetDuration(data.durationMillis);
          SetValue((data.positionMillis / data.durationMillis) * 100);
          if (data.positionMillis > songDurationLocal + startPos) {
            await sound.current.stopAsync();
            onSongEnd();
          }
        }
      }
    } catch (error) {
      console.log('Error');
    }
  };

  const ResetPlayer = async () => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        SetValue(0);
        SetPlaying(false);
        await sound.current.setPositionAsync(0);
        await sound.current.stopAsync();
      }
    } catch (error) {
      console.log('Error');
    }
  };

  const PlayAudio = async () => {
    console.log('inside PlayAudio');
    try {
      const result = await sound.current.getStatusAsync();
      console.log(result);
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          SetPlaying(true);
        }
      }
    } catch (error) {
      SetPlaying(false);
    }
  };

  const PauseAudio = async () => {
    console.log('Pausing  Audio');
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
          SetPlaying(false);
        }
      }
    } catch (error) {
      SetPlaying(true);
    }
  };

  const SeekUpdate = async (data) => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        const result = (data / 100) * Duration;
        await sound.current.setPositionAsync(Math.round(result));
      }
    } catch (error) {
      console.log('Error');
    }
  };
  const SeekUpdateRate = async (data) => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        await sound.current.setRateAsync(data, true, 'High');
        SetRate(data);
      }
    } catch (error) {
      console.log('Error');
    }
  };

  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          music,
          {
            rate: rateSet,
            positionMillis: startPos,
            shouldCorrectPitch: true,
            PitchCorrectionQuality: 'High',
          },
          true
        );

        if (result.isLoaded === false) {
          SetLoading(false);
          SetLoaded(false);
          console.log('Error in Loading Audio');
        } else {
          sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
          SetLoading(false);
          SetLoaded(true);
          console.log(result);
          // SetDuration(result.durationMillis);
        }
      } catch (error) {
        SetLoading(false);
        SetLoaded(false);
      }
    } else {
      SetLoading(false);
      SetLoaded(true);
    }
  };

  const GetDurationFormat = (duration) => {
    let time = duration / 1000;
    let minutes = Math.floor(time / 60);
    let timeForSeconds = time - minutes * 60;
    let seconds = Math.floor(timeForSeconds);
    let secondsReadable = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${secondsReadable}`;
  };

  return (
    <View style={styles.container}>
      <SettingsModal
        title={`Settings`}
        button1={'Ok'}
        button2={''}
        vis={modalVisible}
        onReturn={(ret) => setModalVisible(false)}
        onChangeRate={(rate) => SeekUpdateRate(rate)}
        onChangeDuration={(songLength) => {
          SetSongDurationLocal(songLength);
          console.log(songLength);
          sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
          
        }}
      />
      <View style={[tw`w-full items-center`, { height: 200 }]}>
        <View style={tw`w-full flex-row justify-center items-center`}>
          <PlayerButtons
            icon={'Previous'}
            color={'#776548'}
            color2={'#C9AB78'}
            size={size}
            onButtonPress={() => timeToPlay(0, 0, 10)}
          />
          <PlayerButtons
            icon={'Backward'}
            color={'#776548'}
            color2={'#C9AB78'}
            size={size}
            onButtonPress={() =>
              Value > 7.7 ? SeekUpdate(Value - 7.7) : SeekUpdate(0)
            }
          />
          <PlayerButtons
            icon={'Stop'}
            color={'#776548'}
            color2={'#C9AB78'}
            size={size}
            onButtonPress={() => ResetPlayer()}
          />
          {Loading ? (
            <ActivityIndicator size={'small'} color={'red'} />
          ) : Loaded === false ? (
            <PlayerButtons
              icon={'Play'}
              color={'#776548'}
              color2={'#C9AB78'}
              size={size}
            />
          ) : (
            <PlayerButtons
              icon={Playing ? 'Pause' : 'Play'}
              color={'#776548'}
              color2={'#C9AB78'}
              size={size}
              onButtonPress={Playing ? () => PauseAudio() : () => PlayAudio()}
            />
          )}
          <PlayerButtons
            icon={'Forward'}
            color={'#776548'}
            color2={'#C9AB78'}
            size={size}
            onButtonPress={() =>
              Duration - Value > 7.7
                ? SeekUpdate(Value + 7.7)
                : SeekUpdate(Duration)
            }
          />
          <PlayerButtons
            icon={'Skip'}
            color={'#776548'}
            color2={'#C9AB78'}
            size={size}
          />
          <PlayerButtons
            icon={'Settings'}
            color={'#776548'}
            color2={'#C9AB78'}
            size={size}
            onButtonPress={() => setModalVisible(true)}
          />
        </View>
        <Slider
          style={{ width: '100%' }}
          minimumValue={0}
          maximumValue={100}
          value={Value}
          onSlidingComplete={(data) => SeekUpdate(data)}
          minimumTrackTintColor={'#c9ab78'}
          maximumTrackTintColor="#000000"
          thumbTintColor={'#776548'}
        />
        <Text>
          {`${GetDurationFormat((Value * Duration) / 100)}/${GetDurationFormat(
            Duration
          )}`}
        </Text>
      </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

import { useEffect, useState, useRef } from 'react'
import Layout from '../components/layout';
import tw from 'twrnc';
import useDimensions from '../hooks/useDimensions';
import { Audio } from 'expo-av';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
const music1 = require('../assets/music/kermit-happy-birthday.mp3');

const MusicPlayerScreen = () => {
  const rateSet=0.7;
  const songDuration = 780000; 
  const startPos=3000;

  const { dimensions } =useDimensions();
  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [Playing, SetPlaying] = useState(false);
  const [Duration, SetDuration] = useState(0);
  const [Value, SetValue] = useState(0);
  const [Rate, SetRate] = useState(rateSet);
  const sound = useRef(new Audio.Sound());

  //  function timeToPlay(hours, minutes, seconds) {

  //   let secondsLeft = hours * 3600 + minutes * 60 + seconds;
  //   if (seconds !== 0 || minutes !== 0 || hours !== 0) {
  //     let timerInterval = setInterval(async function () {
  //       secondsLeft--;
  //       if (seconds ===9 0) {
  //         seconds = 59;
  //       } else seconds--;
  //       if (seconds === 59) {
  //         if (minutes === 0) {
  //           minutes = 59;
  //           hours--;
  //         } else minutes--;
  //       }
  //       console.log(hours+':'+minutes+':'+seconds);
  //       if (secondsLeft === 0) {
  //         clearInterval(timerInterval);
  //         const status = await sound.pauseAsync();
  //         setEndOfTrack(true)
  //       }
  //     }, 1000);
  //   }
  // }


// useEffect(() => {
//   return sound
//     ? () => {
//       if (soundStatus.status.position>13000) {
//         console.log("out of range")
//         const status = sound.unloadAsync(); 
//         console.log(status)
//       }
//       }
//     : undefined;
// }, [sound]);


const UpdateStatus = async (data) => {
  try {
    if (data.didJustFinish) {
      ResetPlayer();
    } else if (data.positionMillis) {
      if (!Duration) SetDuration(data.durationMillis)
      if (data.durationMillis) {
        SetValue((data.positionMillis / data.durationMillis) * 100);
        if (data.positionMillis>songDuration){
          await sound.current.stopAsync();
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
  try {
    const result = await sound.current.getStatusAsync();
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
      await sound.current.setRateAsync(data, true,  'High')
      SetRate(data)
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
        music1,
        'https://ia800200.us.archive.org/3/items/favouritescenesshakespeare_1603_librivox/favouritescenes_03_shakespeare_128kb.mp3',
        {
          rate: rateSet, 
            positionMillis: startPos,
            shouldCorrectPitch : true, 
            PitchCorrectionQuality: 'High'
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
        console.log(result)
        SetDuration(result.durationMillis);
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
    <Layout>
      <Text>MusicPlayerScreen</Text>

      <View style={styles.container}>
      <View style={styles.AudioPLayer}>
        {Loading ? (
          <ActivityIndicator size={'small'} color={'red'} />
        ) : Loaded === false ? (
          <MaterialIcons
            name="replay"
            size={24}
            color="black"
            onPress={() => LoadAudio()}
          />
        ) : (
          <Entypo
            name={Playing ? 'controller-paus' : 'controller-play'}
            size={24}
            color="black"
            onPress={Playing ? () => PauseAudio() : () => PlayAudio()}
          />
        )}
        <Slider
          style={{ width: '100%' }}
          minimumValue={0}
          maximumValue={100}
          value={Value}
          onSlidingComplete={(data) => SeekUpdate(data)}
          minimumTrackTintColor={'dodgerblue'}
          maximumTrackTintColor="#000000"
          thumbTintColor={'dodgerblue'}
        />
        <Text>
          {`${GetDurationFormat((Value * Duration) / 100)}/${GetDurationFormat(Duration)}` }
        </Text>
        <Slider
          style={{ width: '100%' }}
          minimumValue={0.5}
          maximumValue={2}
          value={Rate}
          onSlidingComplete={(data) => SeekUpdateRate(data)}
          minimumTrackTintColor={'dodgerblue'}
          thumbTintColor={'dodgerblue'}
        />
         <Text>
           {`Speed: ${(Rate*100).toFixed(1)}%`}
        </Text>
      </View>
    </View>
    </Layout>
  )
}

export default MusicPlayerScreen




const styles = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  AudioPLayer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
  },
});
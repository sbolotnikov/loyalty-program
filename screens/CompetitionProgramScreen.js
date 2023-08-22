import { View, Text} from 'react-native';
import React from 'react';
import { useEffect, useState, } from 'react';
import tw from 'twrnc';
import useDimensions from '../hooks/useDimensions';
import useCompetition from '../hooks/useCompetition';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LayoutComp from '../components/layoutComp';
import { LinearGradient } from 'expo-linear-gradient';
import DisplayProgramItem from '../components/DisplayProgramItem';
import Slider from '@react-native-community/slider';
import PlayerButtons from '../components/svg/PlayerButtons';

const CompetitionProgramScreen = () => {
  const { 
    currentHeat,
    dances,
    program, 
    heatIDs,
    heatIndex, 
  } = useCompetition();
  let list = [];
  const { dimensions } = useDimensions();
  const [size, setSize] = useState(0);
  const [value1, setValue] = useState(0);
   
  useEffect(() => {
    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem('lastSchedule');
         
      } catch (e) {
        // error reading value
      }
    }
    const setLastScreen = async (value) => {
      console.log(value);
      try {
        await AsyncStorage.setItem(
          'lastScreen',
          JSON.stringify({ link: 'Program', params: '' })
        );
      } catch (e) {
        // saving error
        console.log(e);
      }
    };
      setLastScreen();
      fetchData();
  }, [heatIndex]);
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

 console.log(program)
  return ( 
    <LayoutComp>
     {heatIndex > -1 ? (
      <View
        style={[
          tw` bg-[#c9ab78]  h-[${dimensions.screen.height - 50}px] w-[${
            dimensions.screen.width
          }px] relative m-auto`,
          {
            overflow: 'hidden',
          },
        ]}
      >
        {/* '#344869' */}
        <LinearGradient
          colors={['#c9ab78', '#3D1152', '#c9ab78', '#3D1152', '#c9ab78']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={tw`w-full`}
        >
          <View style={tw`w-full flex-row justify-between`}>
            <PlayerButtons
              icon={'Backward'}
              color={'#776548'}
              color2={'#C9AB78'}
              size={size}
              onButtonPress={() => {
                if (value1 == 0) setValue(heatIDs.length - 1);
                else setValue(value1 - 1);
              }}
            />
            <Text
              style={[
                { fontFamily: 'Georgia', textShadow: '2px 2px #344869' },
                tw`font-semibold text-4xl text-white my-4 text-center`,
              ]}
            >
              {(heatIDs)?heatIDs[value1]:""}
            </Text>
            <PlayerButtons
              icon={'Forward'}
              color={'#776548'}
              color2={'#C9AB78'}
              size={size}
              onButtonPress={() => {
                if (value1 == heatIDs.length - 1) setValue(0);
                else setValue(value1 + 1);
              }}
            />
          </View>
          <Slider
            style={tw`w-[95%] m-auto`}
            minimumValue={0}
            maximumValue={heatIDs.length - 1}
            value={value1}
            onSlidingComplete={(data) => setValue(Math.round(data))}
            minimumTrackTintColor={'#c9ab78'}
            maximumTrackTintColor="#000000"
            thumbTintColor={'#776548'}
          />
          <Text
              style={[
                { fontFamily: 'Georgia',   },
                tw`font-semibold text-lg text-white  text-center`,
              ]}
            >
              Current : {currentHeat}
            </Text>
        </LinearGradient>

        <View
          style={[
            tw` w-full justify-start bg-white max-w-[600px] items-center mx-auto`,
            {
              overflow: 'auto',
              height: dimensions.screen.height - 175,
            },
          ]}
        >
          <View style={[tw`w-full flex-row bg-[#3D1152]`]}>
            <Text
              style={[
                tw`w-full text-center font-semibold text-xl text-white`,
                { fontFamily: 'Georgia' },
              ]}
            >
              {heatIDs[value1] + ' ' + dances[value1]}
            </Text>
          </View>
          <View style={[tw`w-full flex-row`]}>
            <Text
              style={[
                tw`w-1/5 text-center font-semibold text-xl`,
                { fontFamily: 'Georgia' },
              ]}
            >
              Number
            </Text>
            <Text
              style={[
                tw`w-4/5 text-center font-semibold text-xl`,
                { fontFamily: 'Georgia' },
              ]}
            >
              Participants
            </Text>
          </View>
          {heatIndex >-1? (
            program
              .filter((x) => x.heat == heatIDs[value1])
              .map((record, key) => (
                <DisplayProgramItem
                  key={'key' + key}
                  number={record.number}
                  event1={record.event}
                  studio={record.studio}
                  participants={record.competitor1 + ' - ' + record.competitor2}
                  endOfCategory={(key<program.length-2)?program[key+1].event:""}
                />
              ))
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
      ) : (
    <></>
  )}
    </LayoutComp>
)}

export default CompetitionProgramScreen;

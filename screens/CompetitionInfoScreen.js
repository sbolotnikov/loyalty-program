import {
  View,
  Text,
  Animated, 
} from 'react-native';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import useDimensions from '../hooks/useDimensions';
import useCompetition from '../hooks/useCompetition';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { getPositionOfSubstring } from '../util/functions';
import LayoutComp from '../components/layoutComp';
import PlayerButtons from '../components/svg/PlayerButtons';
import Slider from '@react-native-community/slider';
import DisplayHeatlistItem from '../components/DisplayHeatlistItem';

const CompetitionInfoScreen = () => {
  const {
    image,
    dates,
    currentHeat,
    name,
    message,
    id,
    program,
    competitors,
    heatIDs,
    heatIndex,
    studios,
    records,
  } = useCompetition();
  let list = [];
  const { dimensions } = useDimensions();
  const [messageStatus, setMessageStatus] = useState(false);
  const [heatList, setHeatList] = useState('');
  const [nextHeat, setNextHeat] = useState(0);
  const [competitorsList, setCompetitorsList] = useState([]);
  const [selectedItem1, setSelectedItem1] = useState('');
  const [size, setSize] = useState(0);
  const [value1, setValue] = useState(0);
  const [name1, setName1] = useState('');
  const startValue = useRef(new Animated.Value(0)).current;
  const endValue = 1;
  useEffect(() => {
    Animated.loop(
      Animated.spring(startValue, {
        toValue: endValue,
        friction: 1,
        useNativeDriver: false,
      }),
      { iterations: 1000 }
    ).start();
  }, [startValue]);

  useEffect(() => {
    if (message.length > 0) setMessageStatus(true);
    else setMessageStatus(false);
  }, [message]);
  const navigation = useNavigation();


  useEffect(() => {
    async function fetchData() {
      try {
        const value = await AsyncStorage.getItem('lastSchedule');
        console.log(value);
        if (value !== null)  {showSchedule(value); setName1(value);}
        else  {showSchedule(list[0]); setName1(list[0]);}
      } catch (e) {
        // error reading value
      }
    }
    const setLastScreen =async(value) =>{
      console.log(value)
      try {
        await AsyncStorage.setItem('lastScreen', JSON.stringify({link:'Competition',params:''}));
      } catch (e) {
        // saving error
        console.log(e);
      }
    } 
    if (competitors){
    for (let i = 0; i < competitors.length; i++) {
      list[i] = competitors[i].nameFull;
    }
    list.sort();
    setCompetitorsList(list);
    setLastScreen();
    fetchData();
  }
  }, [competitors]);


  const nextHeatGet = (selectedItem) => {
    let arrayRecords = records.filter((x) => x.includes(selectedItem));
    let ind = 0;
    let num = 0;
    let closestHeatNumber = 0;
    while (ind <= heatIndex) {
      if (arrayRecords[num].indexOf(heatIDs[ind] + ' ') > -1) {
        closestHeatNumber = ind;
        num++;
        while (
          num < arrayRecords.length &&
          arrayRecords[num].indexOf(heatIDs[ind] + ' ') > -1
        )
          num++;
      }
      if (num == arrayRecords.length) break;
      ind++;
    }
    setNextHeat(num);
  };

  const showSchedule = (selectedItem) => {
    let arrayRecords = records.filter((x) => x.includes(selectedItem));
            let competitor = competitors.filter(
              (x) => x.nameFull == selectedItem
            );
            nextHeatGet(selectedItem);
            for (let i = 0; i < arrayRecords.length; i++) {
              
              let sub1 = arrayRecords[i];
              let eventLine= sub1.split('\n')[2].trim()+" "+sub1.split('\n')[1].split(' ')[1];
              let cutPiece=sub1.split('\n')[1].split(' ')[1];
              sub1=sub1.slice(0,getPositionOfSubstring(studios, sub1))
              arrayRecords[i] =sub1;
              arrayRecords[i] = arrayRecords[i].replace(selectedItem, '');
              arrayRecords[i] = arrayRecords[i].replace(competitor[0].number1,'');
              arrayRecords[i] = arrayRecords[i].replace(cutPiece,'');
              arrayRecords[i] = arrayRecords[i].split('\n')[0].trim()+'\n'+arrayRecords[i].split('\n')[1].trim()
              arrayRecords[i]+='\n'+eventLine;
            }
            setHeatList(arrayRecords);
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('lastSchedule', value);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    if(heatIndex>-1) nextHeatGet(selectedItem1);
    console.log(heatIndex)
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
 const handleChoice = (selectedItem ) => {
  setSelectedItem1(selectedItem);
  showSchedule(selectedItem);
  setName1(selectedItem)
  storeData(selectedItem)
}
  return (
    (heatIndex>-1)?<LayoutComp>
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
                let val=competitorsList.length - 1
                if (value1 != 0) val=value1 - 1;
                setValue(val);
                handleChoice(competitorsList[val])
              }}
            />
            <Text
              style={[
                { fontFamily: 'Georgia', textShadow: '2px 2px #344869' },
                tw`font-semibold text-4xl text-white my-4 text-center`,
              ]}
            >
              {competitorsList[value1]}
            </Text>
            <PlayerButtons
              icon={'Forward'}
              color={'#776548'}
              color2={'#C9AB78'}
              size={size}
              onButtonPress={() => {
                let val=0
                if (value1 != competitorsList.length - 1) val=value1+1;
                 setValue(val);
                handleChoice(competitorsList[val])
              }}
            />
          </View>
          <Slider
            style={tw`w-[95%] m-auto`}
            minimumValue={0}
            maximumValue={competitorsList.length - 1}
            value={value1}
            onSlidingComplete={(data) => {setValue(Math.round(data)); handleChoice(competitorsList[Math.round(data)])}}
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

      <View style={tw` h-full w-full justify-start items-center`}>
        <View
          style={[
            tw` w-full justify-start bg-white max-w-[600px] items-start`,
            {
              overflow: 'auto',
              height: dimensions.screen.height - 175,
            },
          ]}
        >
          {heatList ? (
            heatList.map((record, key) => (
              <DisplayHeatlistItem key={"record"+key} textLine={record.split('\n')[0]} textLine1={record.split('\n')[1]} textLine2={record.split('\n')[2]} highlight={(key == nextHeat)} />         
            ))
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
      
    </View></LayoutComp>:<></>
  );
};

export default CompetitionInfoScreen;

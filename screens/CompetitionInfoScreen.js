import {
  View,
  Text,
  SafeAreaView,
  Animated, 
} from 'react-native';
import React from 'react';
import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import useDimensions from '../hooks/useDimensions';
import useCompetition from '../hooks/useCompetition';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from '../components/Btn';

const CompetitionInfoScreen = () => {
  const {
    image,
    dates,
    currentHeat,
    name,
    message,
    id,
    programFileName,
    competitors,
    heatIDs,
    heatIndex,
    dances,
    items,
    records,
  } = useCompetition();
  let list = [];
  const { dimensions } = useDimensions();
  const [messageStatus, setMessageStatus] = useState(false);
  const [heatList, setHeatList] = useState('');
  const [nextHeat, setNextHeat] = useState(0);
  const [competitorsList, setCompetitorsList] = useState([]);
  const [selectedItem1, setSelectedItem1] = useState('');
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
 
    for (let i = 0; i < competitors.length; i++) {
      list[i] = competitors[i].nameFull;
    }
    list.sort();
    setCompetitorsList(list);
    fetchData();
  }, []);


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
              let sub1 = arrayRecords[i].split('\t');
              arrayRecords[i] =
                sub1[0] + ' ' + sub1[1] + ' with ' + sub1[2] + ' ' + sub1[3];
              arrayRecords[i] = arrayRecords[i].replace(selectedItem, '');
              arrayRecords[i] = arrayRecords[i].replace(
                competitor[0].number1,
                ''
              );
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
    nextHeatGet(selectedItem1);
  }, [heatIndex]);

  return (
    <SafeAreaView
      style={[
        tw` bg-[#c9ab78] pt-5  h-[${dimensions.screen.height}px] w-[${dimensions.screen.width}px] relative m-auto`,
        {
          overflow: 'hidden',
        },
      ]}
    >
    <Btn
            onClick={() => navigation.navigate('Home')}
            title={'Back'}
            style={{
              position: 'absolute',
              top: 0,
              right:0,
              marginTop:5,
              marginRight:5,
              zIndex: 100,
              width: 40,
              fontSize:10
            }}
          />

      <View style={{              
              objectFit: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url(${image})`,}}>
        <Text style={[tw`font-semibold text-4xl text-white text-center mt-4`,{textShadow: '2px 2px #344869'}]}>
          Welcome to {name}
        </Text>
        <Text style={tw`font-semibold text-4xl text-red-500 text-center`}>
          {' '}
          {currentHeat}
        </Text>
        <Text style={[tw`font-semibold text-xl text-white text-center`,{textShadow: '2px 2px #344869'}]}>
        {"Heat list for "+name1}
        </Text>
      </View>

      {messageStatus && (
        <Animated.View
          style={tw.style(
            ``,
            // {left: blinkingEffect }
            {
              transform: [
                {
                  scale: startValue,
                },
              ],
            }
          )}
        >
          <Text style={tw`font-semibold text-4xl text-[#344869] text-center`}>
            Message
          </Text>
          <Text style={tw`font-semibold text-4xl text-[#ff0000] text-center`}>
            {' '}
            {message}
          </Text>
        </Animated.View>
      )}

      <View style={tw` h-full w-full justify-start items-center mt-2`}>
        <SelectDropdown
          dropdownBackgroundColor={'white'}
          data={competitorsList} 
          onSelect={(selectedItem, index) => {
            setSelectedItem1(selectedItem);
            showSchedule(selectedItem);
            setName1(selectedItem)
            storeData(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => { 
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
          buttonStyle={{
            width: 200,
            height: 45,
            backgroundColor: '#FFF',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#776548',
          }}
          buttonTextStyle={{ color: '#444', textAlign: 'left' }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#776548'}
                size={14}
              />
            );
          }}
          dropdownStyle={{
            backgroundColor: '#EFEFEF',
            borderRadius: 8,
            borderWidth: 1,
            width: 200,
            borderColor: '#776548',
          }}
          rowStyle={{
            backgroundColor: '#EFEFEF',
            height: 45,
            borderBottomColor: '#C5C5C5',
          }}
          rowTextStyle={{
            color: '#444',
            textAlign: 'center',
            margin: 'auto',
            textSize: 18,
          }}
        />
        <View
          style={[
            tw` w-[90%] justify-start bg-white max-w-[600px] rounded items-start mt-2`,
            {
              overflow: 'auto',
              height: dimensions.screen.height - 300,
            },
          ]}
        >
          {heatList ? (
            heatList.map((record, key) => (
              <Text
                key={'key' + key}
                style={tw`font-semibold text-lg text-black  text-center ${
                  key == nextHeat ? 'text-red-500' : ''
                }`}
              >
                {record}
              </Text>
            ))
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompetitionInfoScreen;

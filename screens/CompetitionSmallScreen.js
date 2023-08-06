import { View, Text } from 'react-native'
import React from 'react'
import { useEffect, useState, useLayoutEffect, useRef  } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';
import { db } from '../firebase';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Btn from '../components/Btn';
import useCompetition from '../hooks/useCompetition';

const CompetitionSmallScreen = () => {
    const { currentHeat, message } = useCompetition();
 
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
        <Btn
            onClick={() =>  navigation.replace('Login')}
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
     <Text style={tw`font-semibold text-4xl text-[#ff0000] text-center`}> {message}</Text>
     <Text style={tw`font-semibold text-4xl text-[#3D1152] text-center`}>{currentHeat}</Text>
    </View>
  )
}

export default CompetitionSmallScreen
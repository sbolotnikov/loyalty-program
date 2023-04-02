import { View, Text } from 'react-native'
import React from 'react'
import { useEffect, useState, useLayoutEffect, useRef  } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';
import { db } from '../firebase';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import useDimensions from '../hooks/useDimensions';

const CompetitionSmallScreen = () => {
    const [compArray, setCompArray] = useState([{image: '', dates: '', currentHeat: '', name: '', message: ''}]);
    const { dimensions } =useDimensions();
    const [messageStatus, setMessageStatus] = useState(false)
    // const [rotateValue, setRotateValue] = useState(new Animated.Value(0));
    const startValue = useRef(new Animated.Value(0)).current;
    const endValue = 1;
    useEffect(() => {
      Animated.loop(
        Animated.spring(startValue, {
          toValue: endValue,
          friction: 1,
          useNativeDriver: false,
        }),
        {iterations: 1000},
      ).start();
    }, [startValue]);
 
  const [snapshot, loading, err] = useCollection(
    query(collection(db, 'competitions')),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    if (snapshot) {
      let arr = [];
      snapshot.docs.forEach((doc) => {
        console.log(doc.id)
        arr.push({
          ...doc.data(),id: doc.id
        });
      });

      console.log(arr);
      setMessageStatus(arr[0].message>''?true:false)
      setCompArray([...arr]);
    }
  }, [snapshot]);
  return (
    <View>
      <Text>CompetitionSmallScreen</Text>
    </View>
  )
}

export default CompetitionSmallScreen
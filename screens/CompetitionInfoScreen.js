import { View, Text, SafeAreaView,Animated, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect, useState, useLayoutEffect, useRef  } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';
import { db } from '../firebase';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import useDimensions from '../hooks/useDimensions';

const CompetitionInfoScreen = () => {
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
    <SafeAreaView
    style={[
      tw` bg-[#c9ab78] pt-5  h-[${dimensions.screen.height}px] w-[${dimensions.screen.width}px] relative m-auto`,
      { overflow: 'hidden',  objectFit: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${compArray[0].image})`, },
    ]}>
              <TouchableOpacity style={tw`absolute top-0 right-0 mr-3 mt-3`} onPress={()=>navigation.navigate('Home')}>
            <Text>Back</Text>
          </TouchableOpacity>
    <View>
     <Text style={tw`font-semibold text-4xl text-[#3D1152] text-center`}>Heat # {compArray[0].currentHeat}</Text>
    </View>

    {messageStatus&&<Animated.View style={tw.style(``, 
        // {left: blinkingEffect }
        {
            transform: [
              {
                scale: startValue,
              },
            ],
          },
        )}>
     <Text style={tw`font-semibold text-4xl text-[#344869] text-center`}>Message</Text>
     <Text style={tw`font-semibold text-4xl text-[#ff0000] text-center`}> {compArray[0].message}</Text>
     </Animated.View>}
              {/* {compArray[0].image > '' ? (
            <View
              style={[
                tw` w-full rounded-md`,
                {
                  height: '100vh',
                  objectFit: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${compArray[0].image})`,
                },
              ]}
            />
          ) : (
            <View style={tw` h-full w-full justify-center items-center`}>
              <Text>{compArray[0].name}</Text>
            </View>
          )} */}
     
    </SafeAreaView>
  );
};

export default CompetitionInfoScreen;

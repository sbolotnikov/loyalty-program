import {
  View,
  Text,
  Animated,
  Easing,
  SafeAreaView,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from 'react-native-heroicons/outline';
import {LinearGradient} from 'expo-linear-gradient';
import Burger from './svg/burger';
import Navbar from './navbar';
import tw from 'twrnc';
const Layout = ({ children }) => {
  const [visNav, setVisNav] = useState(false);
  const [size1, setSize] = useState(0);
  const [textSize, setTextSize] = useState(0);
  const screen = Dimensions.get('screen');
  const [dimensions, setDimensions] = useState({ screen });
  const logo = require('../assets/dancerslogo.png');
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setDimensions({ screen });
    });
    return () => subscription?.remove();
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const windowWidth = !!Dimensions.get('window').width;
  const heightAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setSize(
      windowWidth > 1000
        ? 140
        : windowWidth >= 700
        ? 100
        : windowWidth > 500
        ? 80
        : 40
    );
    setTextSize(
      windowWidth > 1000
        ? 'xl'
        : windowWidth >= 700
        ? 'lg'
        : windowWidth > 500
        ? 'base'
        : 'sm'
    );
  }, [!!Dimensions.get('window').width]);

  const onPressFunction = () => {
    setVisNav(!visNav);

    Animated.timing(heightAnim, {
      toValue:  visNav? 0
            : windowWidth > 1000
      ? -152
      : windowWidth >= 700
      ? -120
      : windowWidth > 500
      ? -88
      : -56,
      duration: 600,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();





  };
  const onPressHomeFunction = () => {
    navigation.navigate('Home');
  };
  const array = [
    {
      title: 'Activity',
      link: 'Activity',
    },
    {

      title: 'Calendar',
      link: 'Calendar',
    },
    {
      title: 'Home',
      link: 'Home',
    },
    {
      title: 'Get Stars',
      link: 'Getstars',
    },
    {
      title: 'Use Stars',
      link: 'Usestars',
    },
  ];

  return (
    <SafeAreaView
      style={tw` bg-white pt-5 h-full w-full relative overflow-hidden`}>
   
      {/* Header */}
      <View
        style={tw`flex-row pb-3 items-center mx-4 px-4`}
        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          console.log(x, y, width, height);
        }}
      >
        <Pressable onPress={onPressHomeFunction}>
          <Image
            source={logo}
            style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
          />
        </Pressable>
        <View style={tw`flex-1`}>
          <Text style={tw`font-bold text-xl`}>
            Loyalty Program
            {/* <ChevronDownIcon size={20} color="#00CCBB" /> */}
          </Text>
          <Text style={tw`font-bold text-gray-400 text-xs`}>
            Welcome, Guest!
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      <View style={tw`bg-[#00CCBB]`}>
      <LinearGradient
          colors={['#00CCBB','#06b6d4', '#00CCBB']}
          locations={[0.1, 0.5, 0.9]}
          start={{x:0, y:0}}
          end={{x:1, y:1}}
        >
      <View style={tw.style('w-full flex justify-center items-center relative ',{height: dimensions.screen.height})}
      >
          <Image source={logo} style={tw` h-96 w-96 opacity-40`} />
          <View
            style={tw`w-full h-full flex justify-center items-center absolute top-0 left-0`}
          >
            {/* Body */}
            {children}
          </View>     
      </View>
      </LinearGradient>
      </View>
      <Animated.View
       style={tw.style(`absolute  right-0 w-full bg-white`, 
        {
            // Bind height to animated value
            bottom: heightAnim
          }
        )}
        
      >
        <View style={tw`relative  w-full`}>
          <View
            style={[tw`absolute  -top-9 left-1/2`,
            // {transform: [{ translateX: '-50%' },{ translateY: '-50%' }]}
            ]}
          >
            <Pressable
              style={tw`flex justify-center items-center relative`}
              onPress={onPressFunction}
            >
            {/* <Text>X</Text> */}
              <Burger status={!visNav} color={'#00CCBB'}/>
            </Pressable>
          </View>
          <View
            style={tw`flex-row justify-around w-full max-w-6xl mx-auto`}
          >
            <Navbar
              textSize={textSize}
              size1={size1}
              color={'#00CCBB'}
              names={array}
            />
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Layout;
import {
  View,
  Text,
  Animated,
  Easing,
  SafeAreaView,
  Image,
  Pressable,
  Dimensions,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import Burger from './svg/burger';
import Navbar from './navbar';
import tw from 'twrnc';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectItems } from '../features/basketSlice';
import BasketModal from './BasketModal';
import ShoppingCartIcon from './svg/shoppingCart';
const Layout = ({ children }) => {
  const items = useSelector(selectItems);
  const [visNav, setVisNav] = useState(false);
  const [size1, setSize] = useState(0);
  const [textSize, setTextSize] = useState(0);
  const screen = Dimensions.get('screen');
  const [dimensions, setDimensions] = useState({ screen });
  const [modalVisible, setModalVisible] = useState(false);
  const logo = require('../assets/dancerslogo.png');
  const navigation = useNavigation();
  const { currentUser, loading } = useAuth();
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setDimensions({ screen });
    });
    return () => subscription?.remove();
  });
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
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
      toValue: visNav
        ? 0
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
  let profile;
  currentUser !== null && currentUser.status !== undefined
    ? (profile = currentUser.status)
    : (profile = 'default');
  const array = {
    student: [
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
        params: { collectionName: 'activities' },
      },
      {
        title: 'Use Stars',
        link: 'Getstars',
        params: { collectionName: 'goodies' },
      },
    ],
    teacher: [
      {
        title: 'Calendar',
        link: 'CalendarSet',
      },
      {
        title: 'Home',
        link: 'Home',
      },
      {
        title: 'Scan Code',
        link: 'Scan',
      },
    ],
    super: [
      {
        title: 'Calendar',
        link: 'CalendarSet',
      },
      {
        title: 'Scan Code',
        link: 'Scan',
      },
      {
        title: 'Get Stars',
        link: 'ActivitySet',
        params: { collectionName: 'activities' },
      },
      {
        title: 'Use Stars',
        link: 'ActivitySet',
        params: { collectionName: 'goodies' },
      },
    ],
    default: [
      {
        title: 'Home',
        link: 'Home',
      },
    ],
  };
  return (
    <SafeAreaView
      style={[
        tw` bg-white pt-5 mx-auto h-[${dimensions.screen.height}px] w-[${dimensions.screen.width}px] relative`,
        { overflow: 'hidden' },
      ]}
    >
      {/* Header */}
      <View
        style={tw`flex-row pb-3 items-center mx-4 px-4`}
        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
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
            Welcome,{' '}
            {currentUser
              ? currentUser.displayName
                ? currentUser.displayName
                : 'Guest'
              : 'Guest'}
            !
          </Text>
        </View>
        {currentUser.status=="student" &&<TouchableOpacity
          style={tw` p-1 mr-3 relative`}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <ShoppingCartIcon color={'#00CCBB'} width={28} height={28} />
          <Text
            style={tw`font-bold text-white rounded-full bg-red-600 p-1 absolute -top-4 -right-2`}
          >
            {items}
          </Text>
        </TouchableOpacity>}
        {currentUser ? (
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Image
              source={currentUser.photoURL}
              style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
            />
          </Pressable>
        ) : (
          <UserIcon size={35} color="#00CCBB" />
        )}
      </View>
      <View style={tw`bg-[#00CCBB]`}>
        <LinearGradient
          colors={['#00CCBB', '#06b6d4', '#00CCBB']}
          locations={[0.1, 0.5, 0.9]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View
            style={tw.style(
              'w-full flex justify-center items-center relative ',
              { height: dimensions.screen.height - 56 }
            )}
          >
            <Image source={logo} style={tw` h-96 w-96 opacity-40`} />
            <View
              style={[
                tw`w-full h-[${
                  Dimensions.get('window').height
                }px] flex justify-start items-center absolute top-0 left-0`,
              ]}
            >
              {/* Body */}
              {modalVisible && (
                <BasketModal
                  vis={modalVisible}
                  onReturn={() => setModalVisible(!modalVisible)}
                />
              )}
              {children}
            </View>
          </View>
        </LinearGradient>
      </View>
      {currentUser.email && (
        <Animated.View
          style={tw.style(
            `absolute bottom-0 right-0 w-full bg-white`,
            {
              // Bind height to animated value
              bottom: heightAnim,
            },
            { display: !keyboardStatus ? 'flex' : 'none' }
          )}
        >
          <View style={tw`relative  w-full`}>
            <View
              style={[
                tw`absolute  -top-9 left-1/2`,
                ,
                {
                  transform: [{ translateX: -25 }, { translateY: -10 }],
                },
              ]}
            >
              <Pressable
                style={tw`flex justify-center items-center relative`}
                onPress={onPressFunction}
              >
                {/* <Text>X</Text> */}
                <Burger status={!visNav} color={'#00CCBB'} />
              </Pressable>
            </View>
            <View style={tw`flex-row justify-around w-full max-w-6xl mx-auto`}>
              <Navbar
                textSize={textSize}
                size1={size1}
                color={'#00CCBB'}
                names={array[profile]}
                logged={currentUser ? true : false}
              />
            </View>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default Layout;

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
import useDimensions from '../hooks/useDimensions';
import StudioSetModal from './StudioSetModal';
const Layout = ({ children }) => {
  const items = useSelector(selectItems);
  const [visNav, setVisNav] = useState(false);
  const [size1, setSize] = useState(0);
  const [textSize, setTextSize] = useState(0);
  const { dimensions } =useDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const logo = require('../assets/dancerslogo.png');
  const navigation = useNavigation();
  const { currentUser, loading } = useAuth();
  const [modalStudioVisible, setModalStudioVisible] = useState(!currentUser.studio?true:false);
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
    setTextSize(
      dimensions.width > 1000
        ? 'xl'
        : dimensions.width >= 700
        ? 'lg'
        : dimensions.width > 500
        ? 'base'
        : 'sm'
    );
  }, [dimensions.width]);

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
        title: 'Manage Users',
        link: 'Users',
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
      {
        title: 'About',
        link: 'About',
      }
    ],
  };
  return (
    <SafeAreaView
      style={[
        tw` bg-[#c9ab78] pt-5  h-[${dimensions.screen.height}px] w-[${dimensions.screen.width}px] relative m-auto`,
        { overflow: 'hidden' },
      ]}>
      <View
        style={tw`flex-row pb-3 items-center m-0`}
        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
        }}>
        <Pressable onPress={onPressHomeFunction}>
        <View style={tw`h-9 w-9 bg-gray-300 p-5 rounded-full border-[#776548] border-2 m-2 relative`}>
          <Image
            source={logo}
            style={tw`h-8 w-8 absolute top-0 left-0 mt-1 ml-1`}
          />
          </View>
        </Pressable>
        <View style={tw`flex-1`}>
          <Text style={tw`font-bold text-xl text-black`}>
            Loyalty Program
          </Text>
          <Text style={tw`font-bold text-white text-xs`}>
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
          style={tw` p-1 mr-1 mt-4 relative`}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <ShoppingCartIcon color={'#776548'} width={28} height={28} />
          <Text
            style={tw`font-bold text-white rounded-full bg-[#3D1152] p-1 absolute -top-4 -right-2`}
          >
            {items}
          </Text>
        </TouchableOpacity>}
        {currentUser ? (
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Image
              source={currentUser.photoURL}
              style={tw`h-9 w-9  p-5 m-2 rounded-full border-[#776548] border-2`}
            />
          </Pressable>
        ) : (
          <UserIcon size={35} color="#00CCBB" />
        )}
      </View>
      <View style={tw`bg-white`}>

          <View
            style={tw.style(
              'w-full flex justify-center items-center relative ',
              { height: dimensions.screen.height  }
            )}
          >
            <View
              style={[
                tw`w-full  flex justify-start items-center absolute top-0 left-0`,
              ]}
            >
                {(currentUser.status=="student") && <BasketModal
                  vis={modalVisible}
                  onReturn={() => setModalVisible(!modalVisible)}
                />}
                {currentUser.email && !currentUser.studio && <StudioSetModal
                  vis={modalStudioVisible}
                  onReturn={() => setModalStudioVisible(!modalStudioVisible)}
                />}
              {children}
            </View>
          </View>
      </View>
      {currentUser.email && (
        <View
          style={[tw.style(
            ` right-0 w-full bg-[#c9ab78]`,
            { display: !keyboardStatus ? 'flex' : 'none' },
            {position:'sticky', bottom:0}
          )]}
        >
          <View style={tw`relative  w-full`}>
            <View style={tw`flex-row justify-around w-full max-w-6xl mx-auto`}>
              <Navbar
                textSize={textSize}
                size1={size1}
                color={'#000'}
                names={array[profile]}
                logged={currentUser ? true : false}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Layout;

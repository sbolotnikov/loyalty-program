import {
  View,
  Text,
  Animated,
  Easing,
  SafeAreaView,
  Image,
  Pressable,
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
  const [navArray, setNavArray] = useState([]);
  const { dimensions } =useDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const logo = require('../assets/dancerslogo.png');
  const navigation = useNavigation();
  const { currentUser, loading } = useAuth();
  const [modalStudioVisible, setModalStudioVisible] = useState(!currentUser.studio?true:false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
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
      {
        title: 'Competition',
        link: 'Competition',
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
        title: 'Scan',
        link: 'Scan',
      },
      {
        title: 'Competition',
        link: 'Competition',
      },
    ],
    super: [
      {
        title: 'Calendar',
        link: 'CalendarSet',
      },
      {
        title: 'Scan',
        link: 'Scan',
      },
      {
        title: 'Users',
        link: 'Users',
      },
      {
        title: 'Competition',
        link: 'Competition',
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
    MC: [

      {
        title: 'Competition',
        link: 'Competition',
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
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });


    let profile;
    currentUser !== null && currentUser.status !== undefined
      ? (profile = currentUser.status)
      : (profile = 'default');
   setNavArray(array[profile]);  
   console.log(profile, array[profile]);
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
      dimensions.screen.width > 1000
        ? 50
        : dimensions.screen.width >= 700
        ? 45
        : dimensions.screen.width > 500
        ? 40
        : 35
    );
    setTextSize(
      dimensions.screen.width > 1000
        ? 'xl'
        : dimensions.screen.width >= 700
        ? 'lg'
        : dimensions.screen.width > 500
        ? 'sm'
        : 'xs'
    );
  }, [dimensions.screen.width]);

  const onPressHomeFunction = () => {
    navigation.navigate('Home');
  };


  return (
    <View
      style={[
        tw` h-[${dimensions.screen.height}px] w-[${dimensions.screen.width}px] relative m-auto`,
      ,
      ]}>
      <View
        style={[tw`flex-row items-center m-0 bg-[#c9ab78] `,{position:'sticky', top:0, left:0,zIndex:1500}]}
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
        {/* `${size1}px` */}
          <View style={tw`relative  w-full`}>
            <View style={tw`flex-row justify-around w-full max-w-6xl mx-auto`}>
              <Navbar
                textSize={textSize}
                size1={size1}
                color={'#000'}
                names={navArray}
                logged={currentUser ? true : false}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Layout;

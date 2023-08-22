import { View, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Navbar from './navbar';
import tw from 'twrnc';
import useAuth from '../hooks/useAuth';
import useDimensions from '../hooks/useDimensions';
import {
  usePreviousRouteName,
  useRouteName,
} from '../hooks/usePreviousRouteName';
import { useFonts } from 'expo-font';
import CompetitionChoiceModal from './CompetitionChoiceModal';
import useCompetition from '../hooks/useCompetition';

const LayoutComp = ({ children }) => {
  const [fontLoaded] = useFonts({
    Georgia: require('../assets/fonts/georgia.ttf'),
  });
  const [size1, setSize] = useState(0);
  const [textSize, setTextSize] = useState(0);
  const [navArray, setNavArray] = useState([]);
  const { dimensions } = useDimensions();
  const navigation = useNavigation();
  const { currentUser, loading } = useAuth();
  const previousRouteName = usePreviousRouteName();
  const currentScreenName = useRouteName();
  const [modal1Visible, setModal1Visible] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const { 
    heatIndex, 
  } = useCompetition();
  const array = {
    student: [
      {
        title: 'Heatlists',
        link: 'Heatlists',
      },
      {
        title: 'Program',
        link: 'Program',
      },
      {
        title: 'Home',
        link: 'Home',
      },

      {
        title: 'Participants',
        link: 'Participants',
      },
    ],
    teacher: [
      {
        title: 'Heatlists',
        link: 'Heatlists',
      },
      {
        title: 'Program',
        link: 'Program',
      },
      {
        title: 'Home',
        link: 'Home',
      },

      {
        title: 'Participants',
        link: 'Participants',
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
      {
        title: 'Music Player',
        link: 'Music',
      },
      {
        title: 'About',
        link: 'About',
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
      },
    ],
  };
  const checkLastScreen = async () => {
    try {
      const value = await AsyncStorage.getItem('lastScreen');
      let value1 = JSON.parse(value);
      if (value1.link != null && value1.link != 'Home') {
        navigation.navigate(value1.link, value1.params);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const setLastScreen = async (value) => {
    console.log(value);
    try {
      await AsyncStorage.setItem('lastScreen', JSON.stringify(value));
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  useEffect(() => {
    if (heatIndex>-1) setModal1Visible(false)
}, [heatIndex]);
  useEffect(() => {
    if (heatIndex==undefined) setModal1Visible(true)
    console.log('modal started')
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
    console.log(previousRouteName, currentScreenName);
    if (previousRouteName == 'None') checkLastScreen(array[profile]);
    else {
      setLastScreen({
        link: currentScreenName.name,
        params: currentScreenName.params,
      });
    }

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
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

  // const onPressHomeFunction = () => {
  //   navigation.navigate('Home');
  // };

  return (
    <View
      style={[
        tw` h-[${dimensions.screen.height}px] w-[${dimensions.screen.width}px] relative m-auto`,
        ,
      ]}
    >
      <CompetitionChoiceModal
        button1={'Ok'}
        button2={''}
        vis={modal1Visible}
        onReturn={(ret) => setModal1Visible(false)}
      />
      {children}
      {currentUser.email && (
        <View
          style={[
            tw.style(
              `  w-full bg-[#c9ab78]`,
              { display: !keyboardStatus ? 'flex' : 'none' },
              { position: 'sticky', bottom: 0, right: 0 }
            ),
          ]}
        >
          {/* `${size1}px` */}
          <View style={tw`relative  w-full`}>
            <View style={tw`flex-row justify-center w-full  mx-auto`}>
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

export default LayoutComp;

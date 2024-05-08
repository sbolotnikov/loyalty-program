import {
  View,
  Text,
  Modal,
  Image,
  Animated,
  Easing,
  SafeAreaView,
} from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useState, useRef } from 'react';
import useDimensions from '../hooks/useDimensions';
import SwitchingImage from './SwitchingImage';
import ManualImage from './ManualImage';
import { LinearGradient } from 'expo-linear-gradient';
import AutoImages from './AutoImages';
import VideoPlayingComponent from './VideoPlayingComponent';
const ShowPlayingModal = ({
  videoUri,
  button1,
  compName,
  heatNum,
  mode,
  fontSize,
  seconds,
  manualPicture,
  displayedPicturesAuto,
  vis,
  compLogo,
  titleBarHider,
  onReturn,
  heatText,
}) => {
  const handleSubmit = (e, submitten) => {
    e.preventDefault();
    onReturn(submitten);
  };

  // const videoArr =[ require('../assets/video1.mp4'),  require('../assets/video2.mp4'),"https://drive.google.com/file/d/0B07LcArbNiNPM0VNU243bTVDbWc/preview?resourcekey=0-4gNmXPdlFEJjAdVpscIkEQ"];
  const logo = require('../assets/VERTICAL-FADS-whtgold.png');
  const [timeNow, setTimeNow] = useState('');
  const { dimensions } = useDimensions();
  // const [firstTime, setFirstTime] = useState(true);
  const [activePic, setActivePic] = useState(0);

  // const FadeInView = (props) => {
  //   const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  //   useEffect(() => {
  //     Animated.timing(fadeAnim, {
  //       duration: parseInt((seconds * 1000) / 8),
  //       toValue: 1,
  //       easing: Easing.inOut(Easing.ease),
  //       useNativeDriver: false,
  //     }).start(() => {
  //       Animated.timing(fadeAnim, {
  //         duration: parseInt((seconds * 1000) / 8),
  //         delay: parseInt((seconds * 1000 * 6) / 8),
  //         toValue: 0,
  //         easing: Easing.inOut(Easing.ease),
  //         useNativeDriver: false,
  //       }).start();
  //     });
  //   }, [fadeAnim, mode]);

  //   return (
  //     <Animated.View // Special animatable View
  //       style={[
  //         tw.style(`absolute inset-0 m-auto w-full h-full `),
  //         { opacity: fadeAnim }, // Bind opacity to animated value
  //       ]}
  //     >
  //       {props.children}
  //     </Animated.View>
  //   );
  // };
  // call the `updateDateTime` function every second
  useEffect(() => {
  let timerInterval = setInterval(function () {
     
    // create a new `Date` object
    const now = new Date();
    // get the current date and time as a string
    const currentDateTime = now.toLocaleString();
    // update the `textContent` property of the `span` element with the `id` of `datetime`
    setTimeNow(currentDateTime.split(',')[1]);
    clearInterval(timerInterval);
}, 1000);
  },[vis,timeNow])
  return (
    <View
      style={tw` flex-1 justify-center items-center w-[100%] h-[100%] absolute top-0 left-0`}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {}}
      >
        <View
          style={tw`relative  w-[${dimensions.screen.width}px] h-[${dimensions.screen.height}px]`}
        >
          <LinearGradient
            colors={['yellow','red', 'brown', 'red', "yellow"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={tw`w-full h-full flex justify-start items-center`}
          >
            {mode == 'Video' ? (
              <VideoPlayingComponent videoUri={videoUri.link}
                text1={videoUri.name}
                titleBarHider={titleBarHider}
                seconds={seconds}/>
           
            ) : mode == 'Auto' ? (
              <AutoImages picsArray={displayedPicturesAuto} seconds={seconds} />
            ) : mode == 'Manual' ? (
              <ManualImage
                image1={manualPicture.link}
                text1={manualPicture.name}
                compLogo={compLogo}
                titleBarHider={titleBarHider}
                seconds={seconds}
              />
            ) : mode == 'Default' ? (
              <SafeAreaView
                style={tw`w-full h-full flex justify-center items-center`}
              >
                <Image
                  source={logo}
                  resizeMethod={'resize'}
                  resizeMode={'center'}
                  style={[tw`h-[750px] w-[760px]`]}
                />
              </SafeAreaView>
            ) : mode == 'Heats' ? (
              <View style={tw`w-full h-full flex justify-center items-center`}>
                <Text
                  style={[
                    tw`text-white  text-[${fontSize}px]`,
                    { textAlign: 'center' },
                  ]}
                >
                  {heatText}
                </Text>
              </View>
            ) : (
              <View>
                <Text>Underfined</Text>
              </View>
            )}
            <View
              onClick={(e) => handleSubmit(e, button1)}
              style={[tw`absolute top-0 left-1`, { cursor: 'pointer' }]}
            >
              <Text
                style={[
                  tw`text-white font-bold text-3xl m-0`,
                  {
                    // textShadow: '5px 5px #C9AB78',
                  },
                ]}
              >
                {heatNum}
              </Text>
            </View>
            <View
                onClick={(e) => handleSubmit(e, button1)}
                style={[
                  tw`absolute top-0 right-1`,
                  { cursor: 'pointer' },
                ]} 
              >
                <Text
                  id="datetime"
                  style={[
                    tw`text-white font-bold text-3xl m-0`,
                    {
                      // textShadow: '5px 5px #C9AB78',
                    },
                  ]}
                >
                {timeNow}
                </Text>
              </View>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

export default ShowPlayingModal;

import { View, Text, Modal, Image, Animated, Easing, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useState, useRef } from 'react';
import useDimensions from '../hooks/useDimensions';
import SwitchingImage from './SwitchingImage';
import ManualImage from './ManualImage';
import { LinearGradient } from 'expo-linear-gradient';
const VideoPlayingModal = ({
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
  onReturn,
  heatText,
}) => {
  const handleSubmit = (e, submitten) => {
    e.preventDefault();
    onReturn(submitten);
  };

  const video = useRef(null);
  const logo = require('../assets/VERTICAL-FADS-whtgold.png');
  const [status, setStatus] = useState({});
  const { dimensions } = useDimensions();
  // const [firstTime, setFirstTime] = useState(true);
  const [activePic, setActivePic] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const FadeInView = props => {
  
    useEffect(() => {

      Animated.timing(fadeAnim, {
        duration: parseInt((seconds * 1000) / 8),
        toValue: 1,
        easing: Easing.inOut(Easing.ease), 
        useNativeDriver: false,
      }).start(()=>{
        Animated.timing(fadeAnim, {
          duration: parseInt((seconds * 1000) / 8),
          delay: parseInt((seconds * 1000 * 6) / 8),
          toValue: 0,
          easing: Easing.inOut(Easing.ease), 
          useNativeDriver: false,
        }).start();
      });

    }, [fadeAnim, mode]);
  
    return (
      <Animated.View // Special animatable View
        style={[
          tw.style(`absolute inset-0 m-auto w-full h-full `),
          {opacity: fadeAnim}, // Bind opacity to animated value
        ]}>
        {props.children}
      </Animated.View>
    );
  };
  let timerInterval
  const nextActive = (num) => {
     timerInterval = setInterval(function () {
      clearInterval(timerInterval);
      let localPic = num;
      if (localPic < displayedPicturesAuto.length - 1) localPic++;
      else localPic = 0;
      setActivePic(localPic);
      nextActive(localPic);
    }, seconds * 1000);

  };

  useEffect(() => {
    clearInterval(timerInterval);
    if ((mode == 'Auto')&&(displayedPicturesAuto)) nextActive(0);
  }, [mode]);


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
          style={tw`  w-[${dimensions.screen.width}px] h-[${dimensions.screen.height}px]`}
        >
                    <LinearGradient
        colors={['#4169e1', 'black','#4169e1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        
              style={tw`w-full h-full flex justify-start items-center`}
            >
          {mode == 'Video' ? (
            <>
              <View
                onClick={(e) => handleSubmit(e, button1)}
                style={[
                  tw`flex-1 justify-center items-center `,
                  { cursor: 'pointer' },
                ]}
              >
                {/* absolute top-0 left-0 */}
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
                style={[
                  tw`flex justify-center items-center overflow-hidden`,
                  { width: `${dimensions.screen.width * 0.98}px`,
                    height: `${dimensions.screen.height * 0.78}px`, },
                ]}
              >
                <Video
                  ref={video}
                  style={{
                    width: '100%',
                    height: `${dimensions.screen.height * 0.78}px`,
                    overflow: 'hidden', 
                  }}
                  source={{
                    uri: videoUri,
                  }}
                  isMuted
                  resizeMode={ResizeMode.CONTAIN}
                
                  useNativeControls
                  shouldPlay
                  isLooping
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              </View>
              <View style={[tw`flex-1 justify-center items-center w-full`]}>
                <Text
                  style={[
                    tw`text-white font-bold text-3xl m-0`,
                    {
                      textShadow: '5px 5px #C9AB78',
                    },
                  ]}
                >
                  {compName}
                </Text>
              </View>
              </>
          ) : mode == 'Auto' ? (
            <View
              style={tw`w-full h-full flex justify-start items-center`}
            >
              {displayedPicturesAuto && (mode==='Auto') &&<FadeInView>
                <Image
                  source={displayedPicturesAuto[activePic]}
                  resizeMethod={'scale'}
                  resizeMode={'center'}
                  style={[tw`h-full w-auto`]}
                />
                </FadeInView>}
                <SwitchingImage seconds={seconds} activePic={activePic}/>
            </View>
          ): mode == 'Manual' ? (
            
                <ManualImage
                  image1={manualPicture.link} text1={manualPicture.name} seconds={seconds}  />
            
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
            <View
              style={tw`w-full h-full flex justify-center items-center`}
            >
              <Text style={[tw`text-white  text-[${fontSize}px]`, {textAlign: 'center'}]}>
                {heatText}
              </Text>
            </View>
          ) : (
            <View>
              <Text>Underfined</Text>
            </View>
          )}
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

export default VideoPlayingModal;

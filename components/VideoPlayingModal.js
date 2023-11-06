import { View, Text, Modal, Image, Animated, Easing } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useState, useRef } from 'react';
import useDimensions from '../hooks/useDimensions';
import SwitchingImage from './SwitchingImage';
import ManualImage from './ManualImage';
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

    }, [fadeAnim]);
  
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
          {mode == 'Video' ? (
            <View
              style={tw`w-full h-full flex justify-start items-center bg-black`}
            >
              <View
                onClick={(e) => handleSubmit(e, button1)}
                style={[
                  tw`flex-1 justify-start items-center `,
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
                  { width: '93%', height: '93%' },
                ]}
              >
                <Video
                  ref={video}
                  style={{
                    width: `${dimensions.screen.width * 0.98}px`,
                    height: `${dimensions.screen.height * 0.78}px`,
                    overflow: 'hidden',
                  }}
                  source={{
                    uri: videoUri,
                  }}
                  isMuted
                  resizeMode={ResizeMode.COVER}
                  resizeMethod={'scale'}
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
            </View>
          ) : mode == 'Auto' ? (
            <View
              style={tw`w-full h-full flex justify-start items-center bg-black`}
            >
              {displayedPicturesAuto &&<FadeInView>
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
            
          ) : mode == 'Heats' ? (
            <View
              style={tw`w-full h-full flex justify-center items-center bg-black`}
            >
              <Text style={tw`text-white text-[${fontSize}px]`}>
                {heatText}
              </Text>
            </View>
          ) : (
            <View>
              <Text>Underfined</Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default VideoPlayingModal;

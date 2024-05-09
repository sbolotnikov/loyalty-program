import {
  View,
  Text,
  Animated,
  Easing,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import useDimensions from '../hooks/useDimensions';

const VideoPlayingComponent = ({ seconds, videoUri, text1, titleBarHider }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeTextAnim = useRef(new Animated.Value(0)).current;

 
  const { dimensions } = useDimensions();
  useEffect(() => {
    fadeTextAnim.setValue(0);
    fadeAnim.setValue(0);
    Animated.timing(fadeTextAnim, {
      duration: parseInt((seconds * 1000) ),
      easing: Easing.out(Easing.ease),
      toValue: 1,
      useNativeDriver: false,
    }).start(() => {
        Animated.timing(fadeAnim, {
            duration: parseInt(seconds * 1000),
            toValue: 1,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }).start();
    });
   
  }, [videoUri]);
 
  return (
    <SafeAreaView
      style={tw`w-full h-full flex justify-start items-center relative`}
    >
      <center>
        <iframe
          width={dimensions.screen.width}
          height={dimensions.screen.height}
          allow="autoplay;fullscreen;"
          frameBorder="0"
          loop
          allowFullScreen=""
          src={videoUri}
        ></iframe>
      </center>
      <Animated.View // Special animatable View
        style={[
          tw.style(
            `absolute inset-0  w-full h-full flex justify-center items-center`
          ),
          {fontSize: fadeTextAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0px', '100px'],
                })},
            { opacity: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }) }, 
        ]}
      >
        {text1 && !titleBarHider && (
          <Text
            style={[
              tw` font-bold text-white p-3 rounded text-center `,
              {
                textShadow: '5px 5px #C9AB78',
                zIndex: 100,
                backgroundColor: 'rgba(0,0,0,0.9)',
                fontSize:'inherit'

              },
            ]}
          >
            {text1}
          </Text>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default VideoPlayingComponent;

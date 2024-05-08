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

const VideoPlayingComponent = ({
  seconds,
  videoUri,
  text1,
  titleBarHider,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeLogoAnim = useRef(new Animated.Value(0)).current;
  
  const sizeUp = fadeLogoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0px', '1650px'],
  });
  const fadeOut = fadeLogoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const [actText, setActText] = useState(text1);
  const [activePic, setActivePic] = useState(0);
  const [size1, setSize] = useState(0);
  const [size2, setSize2] = useState(0);
  const { dimensions } = useDimensions();
  useEffect(() => {
    setActivePic(activePic + 1);
    Animated.timing(fadeLogoAnim, {
      duration: parseInt((seconds * 1000 * 2) ),
      easing: Easing.out(Easing.ease),
      toValue: 1,
      useNativeDriver: false,
    }).start(() => {
      fadeLogoAnim.setValue(0);
    });
    Animated.timing(fadeAnim, {
      duration: parseInt((seconds * 1000)),
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeAnim, {
        duration: parseInt((seconds * 1000)),
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  }, []);
  useEffect(() => {
    setSize(dimensions.screen.width > 1000 ? 15 : 25);
    setSize2(
      dimensions.screen.width > 1000
        ? 28
        : dimensions.screen.width > 500
        ? 24
        : 24
    );
  }, [dimensions.screen.width]);
  return (
    <SafeAreaView style={tw`w-full h-full flex justify-start items-center`}>
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
          tw.style(`absolute inset-0 m-auto w-full h-full `),
          { opacity: fadeOut }, // Bind opacity to animated value
        ]}
      >
        {text1 && !titleBarHider && (
          <View
            style={[
              tw` absolute left-0 right-0 top-0 h-[${size1}%]  flex justify-${
                size2 == 24 ? 'start' : 'center'
              } items-center`,
              { opacity: 0.7 },
            ]}
          >

            <Text
              style={[
                tw` font-bold text-white opacity-100 text-3xl text-center `,
                {
                  textShadow: '5px 5px #C9AB78',
                  zIndex: 100,
                  backgroundColor: 'rgba(0,0,0,0.9)',
                },
              ]}
            >
              {text1}
            </Text>
          </View>
        )}
      </Animated.View>
  
    </SafeAreaView>
  );
};

export default VideoPlayingComponent;

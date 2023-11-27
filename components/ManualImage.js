import { View, Text, Animated, Easing, Image, SafeAreaView, ImageBackground } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import tw from 'twrnc';
import useDimensions from '../hooks/useDimensions';
import { LinearGradient } from 'expo-linear-gradient';

const ManualImage = ({ seconds, image1, text1 }) => {
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
  const logo = require('../assets/winterClass.svg');
  const awardsPic = require('../assets/awards.png');
  const winterPic = require('../assets/winterClass.svg');
  const [actPic, setActPic] = useState(winterPic);
  const [actText, setActText] = useState('Fred Astaire presents');
  const [activePic, setActivePic] = useState(0);
  const [size1, setSize] = useState(0);
  const [size2, setSize2] = useState(0);
  const { dimensions } =useDimensions();
  useEffect(() => {
    setActivePic(activePic + 1);
    Animated.timing(fadeLogoAnim, {
      duration: parseInt((seconds * 1000 * 2) / 8),
      easing: Easing.out(Easing.ease),
      toValue: 1,
      useNativeDriver: false,
    }).start(() => {
      fadeLogoAnim.setValue(0);
    });
    Animated.timing(fadeAnim, {
      duration: parseInt((seconds * 1000) / 8),
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setActPic(image1);
      setActText(text1);
      Animated.timing(fadeAnim, {
        duration: parseInt((seconds * 1000) / 8),
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  }, [image1]);
  useEffect(() => {
    setSize(
      dimensions.screen.width > 1000
        ? 15 : 25
    );
    setSize2(
        dimensions.screen.width > 1000
        ? 28
        : dimensions.screen.width > 500
        ? 24
        : 24
      );

  }, [dimensions.screen.width]);
  return (
    <SafeAreaView
      style={tw`w-full h-full flex justify-start items-center`}
    >
      <Animated.View // Special animatable View
        style={[
          tw.style(`absolute inset-0 m-auto w-full h-full `),
          { opacity: fadeAnim }, // Bind opacity to animated value
        ]}
      >
      
        {image1 && (
          <ImageBackground
            source={actPic}
            resizeMethod={'scale'}
            resizeMode={'center'}
            style={[tw`h-full w-auto my-auto`, {boxShadow: '0 30px 40px rgba(0,0,0,.1)'}]}
          >
            <LinearGradient
        colors={['#4169e1','#4169e1', 'transparent','#4169e1','#4169e1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        
              style={tw`w-full h-full flex justify-start items-center`}
            ></LinearGradient>
          </ImageBackground>
        )}
          <Image source={awardsPic} style={tw`absolute top-0 left-0 h-[200px] pt-1 w-full z-100 `} resizeMethod={'scale'} resizeMode={'center'}/>
        {text1 && (
          <View
            style={[
              tw`bg-purple-400 absolute left-0 right-0 bottom-0 h-[${size1}%]  flex justify-${size2==24?'start':"center"} items-center`,
              { opacity: 0.7 },
            ]}
          >
            <Image
              source={logo}
              style={tw` absolute top-2 left-${size2==24?2:22} w-${size2} h-${size2} mt-${size2==24?8:1} `}
            />
            <Text
              style={[
                tw` font-bold text-white opacity-100 text-6xl text-center `,
                {
                  textShadow: '5px 5px #C9AB78',
                  fontFamily: 'DancingScript',
                  zIndex: 100,
                },
              ]}
            >
              {actText}
            </Text>
          
          </View>
        )}
      </Animated.View>
      <View // Special animatable View
        style={[
          tw.style(
            `absolute inset-0 m-auto w-full h-full flex justify-center items-center `
          ),
          // Bind opacity to animated value
        ]}
      >
        <Animated.View
          style={{ opacity: fadeOut, height: sizeUp, width: sizeUp }}
        >
          <Image source={logo} style={[tw`h-full w-full`]} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ManualImage;

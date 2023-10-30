import { View, Text, Animated, Easing, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import SwitchingImage from './SwitchingImage';
import tw from 'twrnc';

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
  const logo = require('../assets/dancerslogo.png');
  const [actPic, setActPic] = useState(logo);
  const [actText, setActText] = useState('Fred Astaire presents');
  const [activePic, setActivePic] = useState(0);
  useEffect(() => {
    setActivePic(activePic + 1);
    Animated.timing(fadeLogoAnim, {
        duration: parseInt(seconds * 1000 *2/ 8),
        easing: Easing.out(Easing.ease),
        toValue: 1, 
        useNativeDriver: false,
      }).start(
    //     ()=>{
    //       fadeAnim.setValue(0); 
    //   }
      );
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

  return (
    <View style={tw`w-full h-full flex justify-start items-center bg-black`}>
      <Animated.View // Special animatable View
        style={[
          tw.style(`absolute inset-0 m-auto w-full h-full `),
          { opacity: fadeAnim }, // Bind opacity to animated value
        ]}
      >
        {image1 && (
          <Image
            source={actPic}
            resizeMethod={'scale'}
            resizeMode={'center'}
            style={[tw`h-full w-auto`]}
          />
        )}
        {text1 && (
          <View
            style={[
              tw`bg-purple-400 absolute left-0 right-0 bottom-0 h-[15%] flex justify-center items-center`,
              { opacity: 0.7 },
            ]}
          >
            <Image
              source={logo}
              style={tw` absolute top-2 left-10 w-28 h-28 m-1`}
            />
            <Text
              style={[
                tw` font-bold text-6xl `,
                {
                  textShadow: '5px 5px #C9AB78',
                  fontFamily: 'DancingScript',
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
      tw.style(`absolute inset-0 m-auto w-full h-full flex justify-center items-center `),
       // Bind opacity to animated value
    ]}>
    <Animated.View style={{opacity: fadeOut, height:sizeUp, width:sizeUp}}>
    <Image
            source={logo}
            style={[tw`h-full w-full`]}
          />
  </Animated.View>
  </View>
    </View>
  );
};

export default ManualImage;

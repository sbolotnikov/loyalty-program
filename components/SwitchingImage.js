import { View, Animated, Easing, Text, Image } from 'react-native'
import { useEffect, useRef,useState } from 'react'
import tw from 'twrnc';
const logo = require('../assets/dancerslogo.png');

const SwitchingImage = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sizeUp = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0px', '1650px'],
  });
  const fadeOut = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  
  const AnimateSwitch=()=>{
    Animated.timing(fadeAnim, {
      duration: parseInt(props.seconds * 1000 *1/ 8),
      delay: parseInt(props.seconds * 1000 * 7 / 8),
      easing: Easing.out(Easing.ease),
      toValue: 1, 
      useNativeDriver: false,
    }).start(
      ()=>{
        fadeAnim.setValue(0); 
    }
    );
  } 
    useEffect(() => {
      console.log(fadeAnim._value)
      AnimateSwitch()

    }, [props.activePic]); 
  return (
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
)
}

export default SwitchingImage
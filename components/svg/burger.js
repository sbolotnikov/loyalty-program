import { View, Animated, Easing } from 'react-native';
import { useEffect, useState } from 'react';
import Svg, { Path, G } from 'react-native-svg';
import tw from 'twrnc';
function Burger({ status, color }) {
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(rotateValue, {
      toValue: status ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
 
  }, [status]);
  const rotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });
  const rotateData2 = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-45deg'],
  });
  const middleBar = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 40],
  });
  const changeX = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });
  const changeY = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });
  const changeY2 = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });
  return (
    <View
      style={tw.style(`absolute top-0 left-0 bg-white rounded-t-full`, {
        transform: [{ translateX: -18 }, { translateY: -18 }],
      })}
    >
      <View
        id="containerSVG"
        style={tw`relative h-9 w-9  m-4  overflow-hidden `}
      >
        <Animated.View style={tw.style(`h-9 w-9 absolute top-0 left-0`, 
        { transform: [{ rotate: rotateData }],
            top: changeY,
            left:changeX
          })}>
          <Svg
            id="topbar"
            style={tw.style(`h-9 w-9`)}
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G>
              <Path
                d="M5 13H65.5"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
              />
            </G>
          </Svg>
        </Animated.View>
        <Animated.View style={tw.style(`h-9 w-9 absolute top-0`, 
        {left: middleBar })}>
          <Svg
            id="middlebar"
            style={tw.style(`h-9 w-9`)}
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G>
              <Path
                d="M5 35H65.5"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
              />
            </G>
          </Svg>
        </Animated.View>
        <Animated.View style={tw.style(`h-9 w-9 absolute top-0 left-0 `, 
        {transform: [{ rotate: rotateData2 }],
            top: changeY2,
            left:changeX
          })}>
          <Svg
            id="bottombar"
            style={tw.style(`h-9 w-9`)}
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G>
              <Path
                d="M5 57H65.5"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
              />
            </G>
          </Svg>
        </Animated.View>
      </View>
    </View>
  );
}

export default Burger;

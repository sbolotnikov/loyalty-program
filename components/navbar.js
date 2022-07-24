import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Svg, { Path, Polygon, G } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import ShowIcon from './svg/showIcon';
const Navbar = ({ textSize, size1, color, names, logged }) => {
    const navigation = useNavigation();
    console.log(names)
  return (
    <View
      style={tw.style(`flex-row justify-around w-full max-w-6xl`,{ margin: 'auto' })}
    >
       {names.map((item, key) => {
        return <Pressable key={key} style={tw`flex justify-center items-center relative flex-wrap mt-1`} onPress={() =>
        navigation.navigate(logged?item.link:"Login",)
      }>
          <ShowIcon icon={item.title} color={color} width={size1} height={size1}/>
          <Text
            style={tw`font-extrabold text-${textSize} text-[${color}] text-center`}
          >
            {item.title}
          </Text>
        </Pressable>;
      })}
    </View>
  );
};

export default Navbar;
 {/* {item.svgG!==""? <G transform={item.svgG}>:""}  */}
import { View, Text, Pressable } from 'react-native';

import Svg, { Path, Polygon, G } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import ShowIcon from './svg/showIcon';
import useDimensions from '../hooks/useDimensions';
import { useEffect, useState } from 'react';
const Navbar = ({ textSize, size1, color, names, logged }) => {
    const navigation = useNavigation();
    const { dimensions } =useDimensions();
    const [justifyLocal, setJustifyLocal] = useState({});
    useEffect(() => {
      if (dimensions.screen.width/names.length <60) setJustifyLocal({})
      else setJustifyLocal({justifyContent:"space-around"})
  }, [names]);
  return (
    <View
      style={tw.style(`flex-row  w-full m-auto`,justifyLocal,{ overflowX: 'auto', })}
    >
       {names.map((item, key) => {
        return <Pressable key={key} style={tw`flex justify-center items-center relative flex-wrap m-1`} onPress={() =>
        navigation.navigate(logged?item.link:"Login",logged?item.params:"")
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
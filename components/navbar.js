import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Svg, { Path, Polygon, G } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
const Navbar = ({ textSize, size1, color, names }) => {
    const navigation = useNavigation();
  const mappingPaths = (paths) => {
    return paths.map((d, key1) => <Path d={d} key={`path` + key1} />);
  };
  const mappingPoly = (polygons) => {
    return polygons.length > 0
      ? polygons.map((points, key2) => (
          <Polygon points={points} key={'poly' + key2} />
        ))
      : '';
  };

  return (
    <View
      className="flex-row justify-around w-full max-w-6xl"
      style={{ margin: 'auto' }}
    >
       {names.map((item, key) => {
        return <Pressable key={key} className="flex justify-center items-center relative flex-wrap mt-1" onPress={() =>
        navigation.navigate(item.link,{name:item.title})
      }>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill={color}
            width={size1}
            height={size1}
            viewBox="0 0 1000 1000"
          >
           
            <G transform={item.svgG}>
            {mappingPaths(item.svgPath)}
            {mappingPoly(item.svgPolygon)}
            </G>
          </Svg>
          <Text
            className={`font-extrabold text-${textSize} text-navMain text-center`}
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
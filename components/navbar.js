import { View, Text } from 'react-native';
import React from 'react';
import Svg, { Path, Polygon, G } from 'react-native-svg';
const Navbar = ({ textSize, size1, color, names }) => {
    console.log(`font-extrabold text-${textSize} text-['${color}'] text-center`)
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
        return <View key={key} className="flex justify-center items-center relative flex-wrap mt-1">
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
        </View>;
      })}
    </View>
  );
};

export default Navbar;
 {/* {item.svgG!==""? <G transform={item.svgG}>:""}  */}
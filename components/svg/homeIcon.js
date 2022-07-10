import React from 'react';
import Svg, { Path, Polygon } from "react-native-svg";

const HomeIcon = ({color, width, height}) => {
  return (
<Svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill={color} width={width} height={height} viewBox="0 0 1000 1000">
<Path d="M142.7,592l42.8,363.7h627L861.6,592L500,308.5L142.7,592z M487.2,867H356.7L348.5,730h138.7V867z M487.2,704.3H346.9L337.4,546h149.8L487.2,704.3L487.2,704.3z M512.9,546h149.8l-10.6,158.3H512.9L512.9,546L512.9,546z M512.9,730h137.5L641.2,867H512.9V730z"/>
<Polygon points="990,658.3 859.5,346 504,44.2 436,100.8 429.8,178 429.4,247.4 235,399.6 222.4,278.3 138.4,348.1 10,658.3 504,268.9 "/>
<Polygon points="245.4,371.8 416.6,237.7 416.6,179.3 225.4,179.3 "/>
<Path d="M423,90.1H253.2l-27.8,80.2h191.1L423,90.1z M389.8,153.2H263.7l15-46h116.5L389.8,153.2z"/>
</Svg>
  )
}

export default HomeIcon
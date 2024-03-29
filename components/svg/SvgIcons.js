import { TouchableOpacity } from 'react-native';
import Svg, {
  Path,
  G,
} from 'react-native-svg';

const SvgIcons = ({ icon, size,color, onButtonPress }) => {
  const showComponent = (icon) => {
    if (icon == 'DeleteIcon') {
      return (
        <G transform=" scale(0.68,0.68)">
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={color}
            d="M1.06069 1.06066C1.64647 0.474877 2.59622 0.474877 3.18201 1.06066L21.5668 19.4454C22.1526 20.0312 22.1526 20.981 21.5668 21.5668C20.981 22.1525 20.0312 22.1525 19.4455 21.5668L1.06069 3.18198C0.474901 2.5962 0.474901 1.64645 1.06069 1.06066Z"
          />
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={color}
            d="M1.06062 21.5668C0.47483 20.981 0.47483 20.0312 1.06062 19.4454L19.4454 1.06066C20.0312 0.474876 20.9809 0.474876 21.5667 1.06066C22.1525 1.64645 22.1525 2.5962 21.5667 3.18198L3.18194 21.5668C2.59615 22.1525 1.6464 22.1525 1.06062 21.5668Z"
          />
        </G>
      );
    } 
  };
  return (
    <TouchableOpacity
      style={{ width: size, height: size, margin:3 }}
      onPress={onButtonPress}
    >
      <Svg
        width={size}
        height={size}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
          {showComponent(icon)}
      </Svg>
    </TouchableOpacity>
  );
};

export default SvgIcons;
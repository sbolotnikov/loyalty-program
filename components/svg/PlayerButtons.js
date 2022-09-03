import { TouchableOpacity } from 'react-native';
import Svg, {
  Path,
  G,
  Rect,
  RadialGradient,
  Stop,
  LinearGradient,
  ClipPath,
  Defs,
} from 'react-native-svg';

const PlayerButtons = ({ icon, color, color2, size, onButtonPress }) => {
  const showComponent = (icon) => {
    if (icon == 'Previous') {
      return (
        <G>
          <G opacity="0.8">
            <Path
              id="Vector_6"
              opacity="0.8"
              d="M296.875 295.312V734.375H442.188V515.625V295.312H296.875Z"
              fill="url(#paint4_linear_515_33)"
            />
            <Path
              id="Vector_7"
              opacity="0.8"
              d="M442.188 515.625L734.375 735.938V296.875L442.188 515.625Z"
              fill="url(#paint5_linear_515_33)"
            />
          </G>
          <G>
            <Path
              id="Vector_8"
              d="M281.25 279.687V718.75H426.563V500V279.687H281.25Z"
              fill={color}
            />
            <Path
              id="Vector_9"
              d="M426.563 500L718.75 720.312V281.25L426.563 500Z"
              fill={color}
            />
          </G>
        </G>
      );
    } else if (icon == 'Skip') {
      return (
        <G>
          <G opacity="0.8">
            <path
              id="Vector_6"
              opacity="0.8"
              d="M734.375 295.763V734.826H589.062V516.076V295.763H734.375Z"
              fill="url(#paint4_linear_515_52)"
            />
            <path
              id="Vector_7"
              opacity="0.8"
              d="M589.062 516.076L296.875 736.388V297.326L589.062 516.076Z"
              fill="url(#paint5_linear_515_52)"
            />
          </G>
          <G>
            <Path
              id="Vector_8"
              d="M718.75 280.138V719.201H573.438V500.451V280.138H718.75Z"
              fill={color}
            />
            <Path
              id="Vector_9"
              d="M573.437 500.451L281.25 720.763V281.701L573.437 500.451Z"
              fill={color}
            />
          </G>
        </G>
      );
    } else if (icon == 'Play') {
      return (
        <G>
          <Path
            id="Play2"
            opacity="0.8"
            d="M382.813 734.826L770.313 516.076L382.813 297.326V734.826Z"
            fill="url(#paint4_linear_515_18)"
          />
          <Path
            d="M367.187 719.201L754.687 500.451L367.187 281.701V719.201Z"
            fill={color}
          />
        </G>
      );
    } else if (icon == 'Pause') {
      return (
        <G>
          <G id="SignShadow" opacity="0.8">
            <Path
              id="Vector_6"
              d="M297 305.687V744.75H442.313V526V305.687H297Z"
              fill="url(#paint4_linear_515_18)"
            />
            <Path
              id="Vector_7"
              d="M589.75 301V740.062H735.063V521.312V301H589.75Z"
              fill="url(#paint4_linear_515_18)"
            />
          </G>
          <G>
            <Path
              id="Vector_8"
              d="M281 289.687V728.75H426.313V510V289.687H281Z"
              fill={color}
            />
            <Path
              id="Vector_9"
              d="M566.75 288V727.062H712.063V508.312V288H566.75Z"
              fill={color}
            />
          </G>
        </G>
      );
    } else if (icon == 'Stop') {
      return (
        <G>
          <Path
            id="stopShadow"
            opacity="0.8"
            d="M328.125 703.576H703.125V328.576H328.125V703.576Z"
            fill="url(#paint4_linear_515_120)"
          />
          <Path
            id="stop"
            d="M312.5 687.951H687.5V312.951H312.5V687.951Z"
            fill={color}
          />
        </G>
      );
    } else if (icon == 'Backward') {
      return (
        <G>
          <Path
            opacity="0.8"
            d="M729.688 297.326L531.25 445.763V297.326L239.062 516.076L531.25 734.826V584.826L729.688 734.826V297.326Z"
            fill="url(#paint4_linear_515_86)"
          />
          <Path
            d="M714.063 281.701L515.625 430.138V281.701L223.438 500.451L515.625 719.201V569.201L714.063 719.201V281.701Z"
            fill={color}
          />
        </G>
      );
    } else if (icon == 'Forward') {
      return (
        <G>
          <Path
            opacity="0.8"
            d="M807.813 516.076L515.625 297.326V445.763L317.188 297.326V734.826L515.625 584.826V734.826L807.813 516.076Z"
            fill="url(#paint4_linear_515_71)"
          />
          <Path
            d="M792.188 500.451L500 281.701V430.138L301.562 281.701V719.201L500 569.201V719.201L792.188 500.451Z"
            fill={color}
          />
        </G>
      );
    }
  };
  return (
    <TouchableOpacity
      style={{ width: size, height: size }}
      onPress={onButtonPress}
    >
      <Svg
        width={size}
        height={size}
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G id="Previous_-_Grey" clipPath="url(#clip0_515_33)">
          <G id="Group">
            <G id="Group_2">
              <Path
                id="Vector"
                d="M500 992.188C228.125 992.188 7.8125 771.875 7.8125 500C7.8125 228.125 228.125 7.81244 500 7.81244C771.875 7.81244 992.188 228.125 992.188 500C992.188 771.875 771.875 992.188 500 992.188Z"
                fill="url(#paint0_radial_515_33)"
              />
              <G id="Group_3">
                <Path
                  id="Vector_2"
                  d="M500 15.625C767.188 15.625 984.375 232.812 984.375 500C984.375 767.188 767.188 984.375 500 984.375C232.812 984.375 15.625 767.188 15.625 500C15.625 232.812 232.812 15.625 500 15.625ZM500 0C223.437 0 0 223.437 0 500C0 776.563 223.437 1000 500 1000C776.563 1000 1000 776.563 1000 500C1000 223.437 776.563 0 500 0Z"
                  fill={color}
                />
              </G>
            </G>
            <G id="Group_4" opacity="0.8">
              <Path
                id="Vector_3"
                d="M834.375 150C917.187 237.5 968.75 354.687 968.75 484.375C968.75 751.562 751.562 968.75 484.375 968.75C354.687 968.75 237.5 917.187 150 834.375C237.5 926.562 362.5 984.375 500 984.375C767.188 984.375 984.375 767.187 984.375 500C984.375 362.5 926.562 239.062 834.375 150Z"
                fill="url(#paint1_linear_515_33)"
              />
            </G>
            <G id="Group_5">
              <G id="Group_6">
                <Path
                  id="Vector_4"
                  d="M381.25 589.062C550 442.187 770.313 306.25 959.375 409.375C917.188 193.75 728.125 31.25 500 31.25C242.188 31.25 31.25 242.187 31.25 500C31.25 562.5 43.75 621.875 65.625 676.562C140.625 695.312 256.25 696.875 381.25 589.062Z"
                  fill="url(#paint2_linear_515_33)"
                />
              </G>
            </G>
            <G id="Group_7">
              <Path
                id="Vector_5"
                d="M62.5 531.25C62.5 273.438 273.438 62.5 531.25 62.5C653.125 62.5 762.5 109.375 846.875 184.375C760.938 90.625 637.5 31.25 500 31.25C242.188 31.25 31.25 242.188 31.25 500C31.25 637.5 90.625 760.938 184.375 846.875C109.375 762.5 62.5 653.125 62.5 531.25Z"
                fill="url(#paint3_linear_515_33)"
              />
            </G>
          </G>
          {showComponent(icon)}
        </G>
        <Defs>
          <RadialGradient
            id="paint0_radial_515_33"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(498.994 852.695) scale(507.567 507.567)"
          >
            <Stop stopColor="#E7ECEF" />
            <Stop offset="1" stopColor="#BFC8CD" />
          </RadialGradient>
          <LinearGradient
            id="paint1_linear_515_33"
            x1="485.848"
            y1="324.267"
            x2="744.87"
            y2="1316.94"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="white" />
            <Stop offset="1" stopColor="#B7C6CE" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_515_33"
            x1="367.778"
            y1="18.9031"
            x2="546.505"
            y2="669.133"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={color2} />
            <Stop offset="1" stopColor="#E7ECEF" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_515_33"
            x1="283.806"
            y1="-68.0874"
            x2="616.412"
            y2="896.45"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="white" />
            <Stop offset="1" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_515_33"
            x1="369.828"
            y1="734.177"
            x2="369.828"
            y2="295.502"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="white" />
            <Stop offset="1" stopColor="#B7C6CE" />
          </LinearGradient>
          <LinearGradient
            id="paint5_linear_515_33"
            x1="588.578"
            y1="734.177"
            x2="588.578"
            y2="295.502"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="white" />
            <Stop offset="1" stopColor="#B7C6CE" />
          </LinearGradient>
          <ClipPath id="clip0_515_33">
            <Rect
              width="1000"
              height="1000"
              fill="white"
              transform="matrix(1 0 0 -1 0 1000)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </TouchableOpacity>
  );
};

export default PlayerButtons;

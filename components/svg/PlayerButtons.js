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
    } else if (icon == 'Settings') {
      return (
        <G>        
        <Path opacity="0.8" d="M368.018 482.028C381.708 480.398 395.398 484.564 405.104 493.167L429.623 514.9L452.815 494.435L419.305 464.822C414.094 460.204 414.094 452.688 419.305 448.069C424.515 443.451 432.995 443.451 438.205 448.069L471.715 477.772L494.907 457.306L470.285 435.482C460.579 426.879 455.88 414.654 457.719 402.61C461.805 375.08 451.895 346.283 428.091 325.093C403.776 303.54 370.47 294.846 338.901 299.012C333.895 299.646 331.852 305.17 335.428 308.339L366.997 336.322C382.015 349.634 382.015 371.186 366.997 384.408L347.585 401.613C332.567 414.925 308.252 414.925 293.336 401.613L261.665 373.631C258.089 370.462 251.959 372.273 251.142 376.71C246.442 404.692 256.25 434.214 280.565 455.767C304.472 476.866 336.96 485.65 368.018 482.028Z" fill="url(#paint4_linear_515_71)"/>
        <Path opacity="0.8" d="M564.379 518.885L541.188 539.351L678.906 661.422C684.116 666.04 684.116 673.556 678.906 678.175C673.695 682.793 665.215 682.793 660.005 678.175L522.287 556.104L499.096 576.57L641.002 702.354C658.983 718.292 688.1 718.201 706.081 702.263C724.062 686.325 724.062 660.516 706.184 644.578L564.379 518.885Z" fill="url(#paint4_linear_515_71)"/>
        <Path opacity="0.8" d="M617.607 437.384H678.803L740 328.987L709.453 301.91L587.059 356.063V410.307L420.735 557.281L390.801 530.839L270.247 637.696C245.114 659.973 245.114 696.015 270.247 718.292C295.379 740.569 336.041 740.569 361.173 718.292L481.728 611.435L451.18 584.358L617.607 437.384Z" fill="url(#paint4_linear_515_71)"/>
        
        <Path d="M348.018 466.028C361.708 464.398 375.398 468.564 385.104 477.167L409.623 498.9L432.815 478.435L399.305 448.822C394.094 444.204 394.094 436.688 399.305 432.069C404.515 427.451 412.995 427.451 418.205 432.069L451.715 461.772L474.907 441.306L450.285 419.482C440.579 410.879 435.88 398.654 437.719 386.61C441.805 359.08 431.895 330.283 408.091 309.093C383.776 287.54 350.47 278.846 318.901 283.012C313.895 283.646 311.852 289.17 315.428 292.339L346.997 320.322C362.015 333.634 362.015 355.186 346.997 368.408L327.585 385.613C312.567 398.925 288.252 398.925 273.336 385.613L241.665 357.631C238.089 354.462 231.959 356.273 231.142 360.71C226.442 388.692 236.25 418.214 260.565 439.767C284.472 460.866 316.96 469.65 348.018 466.028Z" fill={color}/>
        <Path d="M544.379 502.885L521.188 523.351L658.906 645.422C664.116 650.04 664.116 657.556 658.906 662.175C653.695 666.793 645.215 666.793 640.005 662.175L502.287 540.104L479.096 560.57L621.002 686.354C638.983 702.292 668.1 702.201 686.081 686.263C704.062 670.325 704.062 644.516 686.184 628.578L544.379 502.885Z" fill={color}/>
        <Path d="M597.607 421.384H658.803L720 312.987L689.453 285.91L567.059 340.063V394.307L400.735 541.281L370.801 514.839L250.247 621.696C225.114 643.973 225.114 680.015 250.247 702.292C275.379 724.569 316.041 724.569 341.173 702.292L461.728 595.435L431.18 568.358L597.607 421.384Z" fill={color}/>
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

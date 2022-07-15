import { View, } from 'react-native';
import React from 'react';
import Svg, { Path, G } from "react-native-svg";

function Burger({status, color}) {

    
  return (
    <View className="absolute top-0 left-0 bg-slate-200 rounded-t-full" style={{ transform: 'translate(-50%, -50%)' }}>  
    <View id="containerSVG" className="relative h-10 w-10 m-4 overflow-hidden " >
                  <Svg id="topbar"
            className={`h-10 w-10 absolute top-0 left-0 transition duration-300 ease-in-out origin-top-left ${status?"rotate-45 translate-x-1 translate-y-4":""}`}
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{transitionTimingFunction: 'ease-in-out', transitionDuration: '600ms'}}
          >
            <G >
              <Path            
                d="M5 13H65.5"
                stroke={color}
                strokeWidth="8"
                strokeLinecap="round"
              />
            </G>
          </Svg>
          <Svg id="middlebar"
            className={`h-10 w-10  absolute top-0 left-0 transition duration-300 ease-in-out ${status?" translate-x-14 translate-y-2":""}`}
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{transitionTimingFunction: 'ease-in-out', transitionDuration: '600ms'}}
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
          <Svg  id="bottombar"
            className={`h-10 w-10 absolute top-0 left-0 transition duration-300 ease-in-out origin-bottom-left ${status?"-rotate-45 -translate-x-1 -translate-y-2":""}`}
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{transitionTimingFunction: 'ease-in-out', transitionDuration: '600ms'}}
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
    </View>
    </View>
  )
}

export default Burger
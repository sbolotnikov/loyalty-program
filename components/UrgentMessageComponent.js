import { View, TextInput, Animated, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
const UrgentMessageComponent = (props) => {
    const [openList, setOpenList] = useState(false);
  return (
    <View
      style={tw`h-11 w-[92%] rounded-full mt-5 bg-white justify-center items-start relative`}
    >
      <TextInput
        style={tw`mt-0 h-11 pl-3 w-full rounded-full border-2 border-[#C9AB78]`}
        {...props}
      />
      <TouchableOpacity onPress={() => {
        setOpenList(!openList);

      }} style={tw`absolute top-4 right-3`}>
        <View // Special animatable View
          style={[
            tw.style(` `),
            {
              transform: [
                {
                  rotate: openList?'0deg':'180deg',
                },
              ],
            },
          ]}
        >
          <FontAwesome name="chevron-down" size={12} color={'#776548'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UrgentMessageComponent;

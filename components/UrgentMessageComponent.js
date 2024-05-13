import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
const UrgentMessageComponent = (props) => {
  const [openList, setOpenList] = useState(false);
  const [urgentMessage, setUrgentMessage] = useState('');
  return (
    <View
      style={tw`h-11 w-[92%] rounded-full mt-5 bg-white justify-center items-start relative z-100`}
    >
      <TextInput
        style={tw`mt-0 h-11 pl-3 w-full rounded-full border-2 border-[#C9AB78]`}
        placeholder={'Enter urgent message'}
        secureTextEntry={false}
        value={urgentMessage}
        onChangeText={(text) => {
          setUrgentMessage(text);
          console.log(text)
          props.onChange(text);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setOpenList(!openList);
        }}
        style={tw`absolute top-4 right-3 z-10`}
      >
        <View // Special animatable View
          style={[
            tw.style(` `),
            {
              transform: [
                {
                  rotate: openList ? '0deg' : '180deg',
                },
              ],
            },
          ]}
        >
          <FontAwesome name="chevron-down" size={14} color={'#776548'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('add');
          props.onMessageArrayChange([...props.savedMessages, urgentMessage]);
        }}
        style={tw`absolute top-4 right-8 z-10 pr-3`}
      >
        <View 
        >
          <FontAwesome name="plus" size={14} color={'#776548'} />
        </View>
      </TouchableOpacity>
      {openList && (
        <View
          style={[
            tw`absolute top-full w-full  bg-white rounded-b-md `,
            { boxShadow: '0 30px 40px rgba(0,0,0,.1)' },
          ]}
        >
          {props.savedMessages.sort(function (a, b) {
                          return b == a ? 0 : b > a ? -1 : 1;
                        }).map((item, i) => (
            <View style={tw`w-full flex flex-row justify-between items-center`} key={i}>
              <TouchableOpacity
                onPress={() => {
                  setUrgentMessage(item);
                  props.onChange(item);
                  setOpenList(!openList);
                }}
              >
                <Text style={tw`p-3`}>{item}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`p-3`}
                onPress={() => {
                  console.log('delete');
                  props.onMessageArrayChange(props.savedMessages.filter(function (letter, index) {
    return index !== i;
}));
                }}>
                  <FontAwesome name="minus" size={14} color={'red'} />  
                </TouchableOpacity>
            </View>
          ))}
          {/* list items */}
        </View>
      )}
    </View>
  );
};

export default UrgentMessageComponent;

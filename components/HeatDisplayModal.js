import { View, Text, Modal } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
// import Video from "react-native-video";
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useState, useRef } from 'react';
import useDimensions from '../hooks/useDimensions';
const HeatDisplayModal = ({
  heatText,
  button1,
  heatNum,
  vis,
  onReturn,
}) => {
  const handleSubmit = (e, submitten) => {
    e.preventDefault();
    onReturn(submitten);
  };

  const { dimensions } = useDimensions();
  return (
    <View style={tw` flex-1 justify-center items-center w-[100%] h-[100%] absolute top-0 left-0`}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {}}
      >
        <View
          style={tw`flex-col justify-center items-center bg-black  w-[${dimensions.screen.width}px] h-[${dimensions.screen.height}px]`}
        >
         <Text style={tw`text-white text-xl`}>
          {heatText}
         </Text>

          <Btn
            onClick={(e) => handleSubmit(e, button1)}
            title={'Back'}
            style={{
              position: 'absolute',
              top: 0,
              right:0,
              marginTop:5,
              marginRight:15,
              zIndex: 100,
              width: 40,
              fontSize:10,
              backgroundColor: '#C9AB78',
              zIndex: 100,
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default HeatDisplayModal;
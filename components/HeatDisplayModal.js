import { View, Text, Modal } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn'; 
import { useState } from 'react';
import useDimensions from '../hooks/useDimensions';
import CountBox from './CountBox';
const HeatDisplayModal = ({ heatText, button1, heatNum, vis, onReturn }) => {
  const handleSubmit = (e, submitten) => {
    e.preventDefault();
    onReturn(submitten);
  };
  const [fontSize, setFontSize] = useState(34); 
  const { dimensions } = useDimensions();
  return (
    <View
      style={tw` flex-1 justify-center items-center w-[100%] h-[100%] absolute top-0 left-0`}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {}}
      >
        <View
          style={tw`flex-col justify-center items-center  w-[${dimensions.screen.width}px] h-[${dimensions.screen.height}px] bg-black`}
        >
          <Text style={tw`text-white text-[${fontSize}px]`}>{heatText}</Text>
          <View style={[tw`absolute top-0 left-0  m-2`,{
              
              zIndex: 100,
            }]}>
          <CountBox
            startValue={fontSize}
            setWidth={1}
            onChange={(num) => {
              console.log(num);
              setFontSize(num)
            }}
          />
          </View>
          <Btn
            onClick={(e) => handleSubmit(e, button1)}
            title={'Back'}
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              marginTop: 5,
              marginRight: 15,
              zIndex: 100,
              width: 40,
              fontSize: 10,
              backgroundColor: '#C9AB78',
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default HeatDisplayModal;

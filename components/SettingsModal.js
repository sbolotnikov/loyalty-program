import { View, Text, Modal } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
const SettingsModal = ({ title, button1, button2, vis, onReturn, onChangeRate, onChangeDuration }) => {
    const [songLength, setSongLength] = useState(180000);
    const [Rate, SetRate] = useState(1);
      const handleSubmit = (e, submitten) => {
        e.preventDefault();
        onReturn(submitten);
      };
      useEffect(() => {
        async function fetchData() {onChangeRate(Rate)}
        fetchData()
}, [Rate]);
      useEffect( () => {
        async function fetchData1() {onChangeDuration(songLength)}
        fetchData1()
}, [songLength]);

      return (
    
        <View style={tw` flex-1 justify-center items-center absolute top-0 left-0`}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={vis}
            onRequestClose={() => {}}
          >
            <View
              style={[tw`flex-1 justify-center items-center `,{shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, shadowRadius: 10, elevation: 5}]}
            >
    
              <View
                style={tw` justify-center items-center bg-white rounded-md border w-[85%] max-w-md`}
              >
              <Text style={tw`font-bold text-xl text-black`}>{title}</Text>
                        <Slider
          style={{
            width: '92%',
            height: 100,
            alignItems: 'center',
            backgroundColor: '#ecf0f1',
            padding: 8,
          }}
          minimumValue={1}
          maximumValue={600000}
          value={songLength}
          onSlidingComplete={(data) => setSongLength(data)}
          minimumTrackTintColor={'#c9ab78'}
          maximumTrackTintColor="#000000"
          thumbTintColor={'#776548'}
        />
        <Text>
          {`Song Length: ${Math.floor(songLength / 60000)}m${Math.floor(
            (songLength - Math.floor(songLength / 60000) * 60000) / 1000
          )}s `}
        </Text>
        <Slider
        style={{
            width: '92%',
            height: 100,
            alignItems: 'center',
            backgroundColor: '#ecf0f1',
            padding: 8,
          }}
        minimumValue={0.5}
        maximumValue={2}
        value={Rate}
        onSlidingComplete={(data) => SetRate(data)}
        minimumTrackTintColor={'#c9ab78'}
        maximumTrackTintColor="#000000"
        thumbTintColor={'#776548'}
      />
       <Text>
         {`Speed: ${(Rate*100).toFixed(1)}%`}
      </Text>
      
                <View
                  style={tw`flex-row justify-around items-center flex-wrap w-[92%] mb-1`}
                >
                  <Btn
                    onClick={(e) => handleSubmit(e, button1)}
                    title={button1}
                    style={{ width: '48%', backgroundColor: '#3D1152' }}
                  />

                </View>
              </View>       
            </View>
          </Modal>
        </View>
      );
    };
    

export default SettingsModal
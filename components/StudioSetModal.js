import { Modal, Text, View } from 'react-native'
import { useEffect, useState } from 'react';
import tw from 'twrnc';
function StudioSetModal() {
  return (
    <View style={tw` flex-1 justify-center items-center`}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={vis}
      onRequestClose={() => {}}
    >
      <View
        style={tw`flex-1 justify-center items-center w-full h-full bg-black/30`}
      >
        <View
          style={[
            tw` justify-start items-center bg-white w-[92%] h-[92%] max-w-[800px] rounded-md relative`,
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              elevation: 5,
            },
          ]}
        >
         <Text
                style={tw`font-extrabold text-2xl text-center mt-3 text-[#3D1152]`}
              >
                Choose your studio:
              </Text>
        </View>
      </View>
    </Modal>
    </View>    
  )
}

export default StudioSetModal
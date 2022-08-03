import { View, Text, Modal } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
const AlertModal = ({ title, button1, button2, vis, onReturn }) => {
  const handleSubmit = (e, submitten) => {
    e.preventDefault();
    onReturn(submitten);
  };
  
  return (

    <View style={tw` flex-1 justify-center items-center`}>
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
            style={tw` justify-center items-center bg-white rounded-md border max-w-md`}
          >
            <Text style={tw`text-red-600 text-xl m-2`}>{title}</Text>
            <View
              style={tw`flex-row justify-around items-center flex-wrap w-[92%] mb-1`}
            >
              <Btn
                onClick={(e) => handleSubmit(e, button1)}
                title={button1}
                style={{ width: '48%', backgroundColor: '#0B3270' }}
              />
              <Btn
                onClick={(e) => handleSubmit(e, button2)}
                title={button2}
                style={{ width: '48%', backgroundColor: '#344869' }}
              />
            </View>
          </View>       
        </View>
      </Modal>
    </View>
  );
};

export default AlertModal;

import { View, Text, Modal } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
import Slider from '@react-native-community/slider';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import useDimensions from '../hooks/useDimensions';
const SongSelectModal = ({ title, button1, button2, vis, onReturn, onChangeRate, onChangeDuration }) => {
    // const [songLength, setSongLength] = useState(180000);
    // const [Rate, SetRate] = useState(1);
      const handleSubmit = (e, submitten) => {
        e.preventDefault();
        onReturn(submitten);
      };

//       useEffect(async () => {
//     onChangeDuration(songLength)
// }, [songLength]);
const { currentUser } = useAuth();
const [values, setValues] = useState({
  name: '',
  desc: '',
  price: 0,
  image: '',
  uid: '',
  amount: 0,
});
const conditions = [];
// conditions.push(
//   where('price', collectionName == 'activities' ? '>' : '<', 0)
// );
// const [value, loading, error] = useCollection(
//   query(collection(doc(db, 'studios', currentUser.studio), 'activities'), ...conditions),
//   {
//     snapshotListenOptions: { includeMetadataChanges: true },
//   }
// );
const [activities, setActivities] = useState([]);
const { dimensions } =useDimensions();

// useEffect(() => {

//   if (value)
//     setActivities(
//       value.docs.map((doc) => ({ ...doc.data(), amount: 1, uid: doc.id }))
//     );
// }, [value]);
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
                style={tw` justify-center items-center bg-white rounded-md border w-[90%] max-w-[1000px]`}
              >
                       
        
      
                <View
                  style={tw`flex-col justify-around items-center flex-wrap w-[92%] mb-1`}
                >
                <Text style={tw`font-bold text-xl text-black`}>{title}</Text>
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
    

export default SongSelectModal
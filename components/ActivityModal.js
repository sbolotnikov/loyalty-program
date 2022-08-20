import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import tw from 'twrnc';
const logo = require('../assets/dancerslogosm.png');
import { db } from '../firebase';
import { doc, collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import { Divider } from 'react-native-elements';

const ActivityModal = ({ vis, uid, name, url, onReturn }) => {
  const [activities, setActivities] = useState([]);
  const [summed, setSums] = useState(0);
  console.log(uid);
  useEffect(async () => {
    let arr = [];
    if (uid !== '') {
      const querySnapshot = await getDocs(
        collection(doc(db, 'users', uid), 'rewards')
      );
      querySnapshot.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
          date: moment(doc.data().confirmed.toDate().getTime()).format(),
        });
      });

      arr.sort(function (a, b) {
        return b.date == a.date ? 0 : b.date > a.date ? 1 : -1;
      });
      console.log(arr);
      setActivities([...arr]);
    }
  }, [uid]);
  useEffect(() => {
    let localSum = 0;
    for (let i = 0; i < activities.length; i++) {
      localSum += activities[i].points;
    }
    setSums(localSum);
  }, [activities]);
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
            <TouchableOpacity
              style={tw`absolute top-0 right-0 mr-3 mt-3`}
              onPress={() => onReturn()}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <Text
                style={tw`font-extrabold text-2xl text-center mt-3 text-[#3D1152]`}
              >
                Activities
              </Text>
            <View
              style={tw`flex-row justify-between items-center  flex-wrap w-full`}
            >

              <Image
                source={url ? url : logo}
                style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full ml-2`}
              />
              <Text style={tw`font-extrabold text-xl text-[#776548] mr-2`}>
                Name: {name}
              </Text>
              <Text
                style={tw` text-[#776548] w-full font-extrabold text-right mr-2`}
              >
                Balance: {summed}
              </Text>
            </View>
            <View
              style={[
                tw`w-[98%] h-[80%] justify-center items-center m-auto bg-[#c9ab78]/30 m-1 rounded-lg border border-[#776548] py-5 relative`,
                { overflow: 'auto' },
              ]}
            >
              <View style={tw`h-auto w-full absolute top-0 left-0`}>
                {activities.map((doc, i) => (
                  <View
                    key={doc.id}
                    style={tw`flex-row justify-between w-[95%] items-center mx-auto my-2 h-auto flex-wrap`}
                  >
                    <View style={tw`w-[65%]`}>
                      {i > 0 ? (
                        moment(doc.confirmed.toDate().getTime()).format(
                          'MMM DD YYYY'
                        ) !=
                          moment(
                            activities[i - 1].confirmed.toDate().getTime()
                          ).format('MMM DD YYYY') && (
                          <Divider bold={true} color={'#776548'} width={5} />
                        )
                      ) : (
                        <Divider bold={true} color={'#776548'} width={5} />
                      )}
                      {i > 0 ? (
                        moment(doc.confirmed.toDate().getTime()).format(
                          'MMM DD YYYY'
                        ) !=
                          moment(
                            activities[i - 1].confirmed.toDate().getTime()
                          ).format('MMM DD YYYY') && (
                          <Text
                            style={tw`ml-2 font-extrabold text-xl text-[#3D1152]`}
                          >
                            {' '}
                            Date:{' '}
                            {moment(doc.confirmed.toDate().getTime()).format(
                              'MMM DD YYYY'
                            )}{' '}
                          </Text>
                        )
                      ) : (
                        <Text
                          style={tw`ml-2 font-extrabold text-xl text-[#3D1152]`}
                        >
                          {' '}
                          Date:{' '}
                          {moment(doc.confirmed.toDate().getTime()).format(
                            'MMM DD YYYY'
                          )}{' '}
                        </Text>
                      )}
                      <Text style={tw`ml-2 text-xl text-[#3D1152] `}>
                    {moment(doc.confirmed.toDate().getTime()).format('hh:mm a')}
                  </Text>
                  <Text style={tw`ml-2 text-xl text-[#776548] `}>
                    Activity:{doc.name}
                  </Text>
                      <View style={tw`ml-2 flex-row justify-between`}>
                        <Text style={tw`ml-2`}> Amount: {doc.amount}</Text>
                        {doc.points < 0 ? (
                          <Text
                            style={tw`text-white rounded-full bg-red-600 w-7 text-lg pl-2`}
                          >
                            &#8681;
                          </Text>
                        ) : (
                          <Text
                            style={tw`text-white rounded-full bg-green-600 w-7 text-lg pl-1`}
                          >
                            {' '}
                            &#8679;
                          </Text>
                        )}
                      </View>
                      <Text style={tw`ml-2`}>
                        {' '}
                        Confirmed by : {doc.cofimedby}{' '}
                      </Text>
                      <Text style={tw`ml-2`}> Note: {doc.note} </Text>
                    </View>
                    <View style={tw`w-[35%] flex-row`}>
                      <Text
                        style={tw`w-full ${
                          doc.points > 0 ? 'text-center' : 'text-right'
                        }`}
                      >
                        Points:{' '}
                        <Text
                          style={tw`${
                            doc.points < 0 ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {' '}
                          {doc.points}
                        </Text>
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActivityModal;

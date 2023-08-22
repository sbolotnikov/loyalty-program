import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import useDimensions from '../hooks/useDimensions';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useCompetition from '../hooks/useCompetition';
import AlertModal from './AlertModal';
import useAuth from '../hooks/useAuth';
const CompetitionChoiceModal = ({ button1, button2, vis, onReturn }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteItem, setDeleteItem] = useState('');
  const { setCompID } = useCompetition();
  const { dimensions } = useDimensions();
  const { currentUser } = useAuth();
  const [snapshot, loading, err] = useCollection(
    query(collection(db, 'competitions')),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [compArray, setCompArray] = useState([]);

  const getNewCompetitions = async () => {
    const newCompRef = doc(collection(db, 'competitions'));
    await setDoc(newCompRef, {
      dances: [''],
      heatIDs: ['Heat 1'],
      heatIndex: 0,
      items: [''],
      message: '',
      program: [
        { competitor1: 'Come back', competitor2: 'later!', heat: 'Heat 1' },
      ],
      records: [''],
    });
    console.log(newCompRef);
  };

  useEffect(() => {
    if (snapshot) {
      let arr = [];
      snapshot.docs.forEach((doc1) => {
        arr.push({
          ...doc1.data(),
          id: doc1.id,
        });
      });
      setCompArray(arr);
    }
  }, [snapshot]);

  const onConfirmFunction = async (ret) => {
    setModalVisible(false);
    if (ret == 'Confirm') {
      await deleteDoc(doc(db, 'competitions', deleteItem));
    }
  };
  return (
    <View
      style={tw` flex-1 justify-center items-center w-[100%] h-[100%] absolute top-0 left-0`}
    >
      <Modal
        animationType="slide"
        transparent={false}
        visible={vis}
        onRequestClose={() => {}}
      >
        <View
          style={tw`flex-col justify-center items-center  w-[${dimensions.screen.width}px] h-[${dimensions.screen.height}px]`}
        >
          <AlertModal
            title={'Are you sure you want to delete'}
            button1={'Confirm'}
            button2={'Cancel'}
            vis={modalVisible}
            onReturn={(ret) => onConfirmFunction(ret)}
          />
          <Btn
            onClick={(e) => {
              navigation.navigate('Home');
              // handleSubmit(e, button1)
            }}
            title={'Home'}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              marginTop: 5,
              marginRight: 15,
              zIndex: 100,
              width: 60,
              backgroundColor: '#C9AB78',
            }}
          />
          {currentUser.status == 'super' && (
            <Btn
              onClick={(e) => getNewCompetitions()}
              title={'Add New Comp'}
              style={{
                position: 'absolute',
                top: 0,
                right: 80,
                marginTop: 5,
                marginRight: 15,
                zIndex: 100,
                width: 150,
                fontSize: 8,
                backgroundColor: 'red',
              }}
            />
          )}
          {compArray ? (
            compArray.map((item, i) => (
              <View
                key={'opac' + i}
                style={[
                  tw`w-full flex-row justify-center`,
                  { borderBottom: `3px solid #c9ab78` },
                ]}
              >
                <Image
                  key={'img' + i}
                  source={item.image}
                  style={tw`h-14 w-14 bg-gray-300  rounded m-2`}
                  onClick={() => {
                    setCompID(item.id);
                    console.log(item.id);
                  }}
                />
                <View key={'view' + i} style={[tw`w-3/4 flex-col`]}>
                  <Text
                    key={'text1' + i}
                    style={[
                      tw` w-full text-left font-bold text-2xl`,
                      { fontFamily: 'Georgia' },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    key={'text2' + i}
                    style={[tw`w-full text-left text-lg`]}
                  >
                    {item.dates}
                  </Text>
                  {(currentUser.status=='super')&&<Btn
                    onClick={(e) => {
                      setDeleteItem(item.id);
                      setModalVisible(true);
                    }}
                    title={'Delete'}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 80,
                      marginTop: 5,
                      marginRight: 15,
                      zIndex: 100,
                      width: 150,
                      fontSize: 8,
                      backgroundColor: 'red',
                    }}
                  />}
                </View>
              </View>
            ))
          ) : (
            <></>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default CompetitionChoiceModal;

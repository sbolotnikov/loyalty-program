import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Layout from '../components/layout';
import tw from 'twrnc';
import SelectDropdown from 'react-native-select-dropdown';
import {
  docs,
  collection,
  getDocs,
  orderBy,
  doc,
  setDoc,
  where,
  query,
} from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import moment from 'moment';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { DataTable } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AlertModal from '../components/AlertModal';
import ActivityModal from '../components/ActivityModal';
const UsersScreen = () => {
  const { currentUser } = useAuth();
  const [usersArray, setUsersArray] = useState([]);
  const [changeStatus, setChangeStatus] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const [snapshot, loading, err] = useCollection(
    query(collection(db, 'users'),
    where('studio', '==', currentUser.studio)),
    orderBy('lastSeen', 'desc'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useEffect(() => {
    if (snapshot) {
      let arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });

      console.log(arr);
      setUsersArray(arr);
    }
  }, [snapshot]);

  const updateUserStatusLocal = async (index, value) => {
    let arr = usersArray;
    arr[index].status = value;
    setUsersArray([...arr]);
  };

  const onConfirmFunction = async (ret) => {
    console.log(changeStatus);
    setModalVisible(false);
    if (ret == 'Confirm') {
      const docRef = doc(db, 'users', changeStatus.id);
      setDoc(
        docRef,
        {
          status: changeStatus.new,
        },
        { merge: true }
      );
      //   await deleteDoc(doc(db,"activities", uid));
      //   deleteOldImage('active',image);
      //   onReturn();
    } else {
      //trying to trigger usersArray update and Table update
      await updateUserStatusLocal(changeStatus.index, changeStatus.new);
      await updateUserStatusLocal(changeStatus.index, changeStatus.old);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <Layout>
        <AlertModal
          title={`Would you like to change status of ${changeStatus.name} from ${changeStatus.old} to ${changeStatus.new}?`}
          button1={'Confirm'}
          button2={'Cancel'}
          vis={modalVisible}
          onReturn={(ret) => onConfirmFunction(ret)}
        />

        <ActivityModal
          vis={modalVisible2}
          uid={
            !!usersArray[currentUserIndex]
              ? usersArray[currentUserIndex].id
              : ''
          }
          name={
            !!usersArray[currentUserIndex]
              ? usersArray[currentUserIndex].displayName
              : ''
          }
          url={
            !!usersArray[currentUserIndex]
              ? usersArray[currentUserIndex].photoURL
              : ''
          }
          onReturn={() => setModalVisible2(!modalVisible2)}
        />
        <View
          style={tw`max-w-[800px] w-full h-full justify-start items-center`}
        >
          <Text style={tw`text-3xl font-extrabold mb-2 text-[#3D1152]`}>
            Users Manage screen
          </Text>
          <DataTable
            style={[
              tw`w-[98%] h-[68%] m-1 rounded-lg border border-[#776548]`,
              { overflow: 'auto' },
            ]}
          >
            <DataTable.Header>
              <DataTable.Title style={{ flex: 2 }}>Name</DataTable.Title>
              <DataTable.Title numeric>Status</DataTable.Title>
              <DataTable.Title numeric>Last Seen</DataTable.Title>
            </DataTable.Header>
            {usersArray.map((user, userIndex) => (
              <DataTable.Row
                key={user.id}
                onPress={(e) => {
                  if (usersArray[userIndex].status == 'student') {
                    setModalVisible2(true);
                    setCurrentUserIndex(userIndex);
                  }
                }}
              >
                <DataTable.Cell style={{ flex: 2 }}>
                  <View style={tw`flex-col w-full`}>
                    <Text style={tw`flex-wrap text-base font-bold`}>
                      {user.displayName}
                    </Text>
                    <Text style={tw`flex-wrap text-xs italic`}>
                      {user.email}
                    </Text>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={tw`justify-end items-center`} numeric>
                  <SelectDropdown
                    dropdownBackgroundColor={'white'}
                    data={['student', 'super', 'teacher']}
                    defaultValue={user.status}
                    onSelect={(selectedItem, index) => {
                      console.log(
                        selectedItem,
                        usersArray[userIndex].displayName,
                        usersArray[userIndex].status
                      );
                      if (selectedItem != usersArray[userIndex].status) {
                        setChangeStatus({
                          name: usersArray[userIndex].displayName,
                          old: usersArray[userIndex].status,
                          id: usersArray[userIndex].id,
                          new: selectedItem,
                          index: userIndex,
                        });
                        setModalVisible(true);
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      //   console.log(selectedItem, index);
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                    buttonStyle={{
                      width: 70,
                      height: 25,
                      backgroundColor: '#FFF',
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#776548',
                    }}
                    buttonTextStyle={{ color: '#444', textAlign: 'left' }}
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <FontAwesome
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          color={'#776548'}
                          size={18}
                        />
                      );
                    }}
                    dropdownStyle={{
                      backgroundColor: '#EFEFEF',
                      borderRadius: 8,
                      borderWidth: 1,
                      width: 90,
                      borderColor: '#776548',
                    }}
                    rowStyle={{
                      backgroundColor: '#EFEFEF',
                      height: 35,
                      borderBottomColor: '#C5C5C5',
                    }}
                    rowTextStyle={{
                      color: '#444',
                      textAlign: 'center',
                      margin: 'auto',
                      textSize: 18,
                    }}
                  />
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {moment(user.lastSeen.toDate().getTime()).format(
                    'MM/DD/YYYY'
                  )}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </Layout>
    </KeyboardAwareScrollView>
  );
};

export default UsersScreen;

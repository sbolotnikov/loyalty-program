import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Layout from '../components/layout';
import tw from 'twrnc';
import SelectDropdown from 'react-native-select-dropdown';
import { docs, collection, getDocs, orderBy } from 'firebase/firestore';
import moment from 'moment';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { DataTable } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AlertModal from '../components/AlertModal';
const UsersScreen = () => {
  const [usersArray, setUsersArray] = useState([]);
  const [changeStatus,setChangeStatus]= useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [snapshot, loading, err] = useCollection(
    collection(db, 'users'),
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
  const onConfirmFunction=async (ret)=>{
    setModalVisible(false); 
    if (ret=='Confirm'){
    //   await deleteDoc(doc(db,"activities", uid));
    //   deleteOldImage('active',image);
    //   onReturn();
    }
   }
  return (
    <KeyboardAwareScrollView>
      <Layout>
      <AlertModal title={`Would you like to change status of ${changeStatus.name} from ${changeStatus.old} to ${changeStatus.new}?`} button1={'Confirm'} button2={"Cancel"} vis={modalVisible} onReturn={(ret)=>onConfirmFunction(ret)}/>
        <View
          style={tw`max-w-[800px] w-full h-full justify-center items-center`}
        >
          <Text style={tw`text-4xl font-extrabold mb-2 text-[#0B3270]`}>
            Users Manage screen
          </Text>
          <DataTable  style={[
            tw`w-[98%] h-[60%] m-1 rounded-lg border `,
            { overflow: 'auto' },
          ]}>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
              <DataTable.Title>Last Seen</DataTable.Title>
            </DataTable.Header>
            {usersArray.map((user) => (
              <DataTable.Row key={user.id}>
                <DataTable.Cell>{user.displayName}</DataTable.Cell>
                <DataTable.Cell style={tw`justify-start items-center`}>
                  <SelectDropdown
                    dropdownBackgroundColor={"white"}
                    data={['student', 'super', 'teacher']}
                    defaultValue={user.status}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, usersArray[index].displayName, usersArray[index].status);
                      if (selectedItem!=usersArray[index].status) {
                        setChangeStatus({name:usersArray[index].displayName, old:usersArray[index].status,id:usersArray[index].id,new:selectedItem})
                        setModalVisible(true)
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
    width: 100,
    height: 30,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  }}
            buttonTextStyle={{color: '#444', textAlign: 'left'}}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={{backgroundColor: '#EFEFEF'}}
            rowStyle={{backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'}}
            rowTextStyle={{color: '#444', textAlign: 'left'}}
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  {moment(user.lastSeen.toDate().getTime()).format(
                    'MMM DD YYYY, hh:mm'
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

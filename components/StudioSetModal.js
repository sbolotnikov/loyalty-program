import { Modal, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import tw from 'twrnc';
import SelectDropdown from 'react-native-select-dropdown';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useDimensions from '../hooks/useDimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useAuth from '../hooks/useAuth';
import Btn from './Btn';

function StudioSetModal({ vis, onReturn }) {
  const { dimensions } = useDimensions();
  const { setCurrentProfile, setCurrentArea } = useAuth();
  const [area1, setArea] = useState('');
  const [selectedStudio, setSelectedStudio] = useState('');
  const [subStudios, setSubStudios] = useState([]);
  const [phone, setPhone] = useState(''); 
 
  const [value, loading, error] = useCollection(collection(db, 'studios'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    async function fetchData() {
      let arr = [];
      const querySnapshot = await getDoc(
        doc(db, 'studios', 'vQjZg0gVkwUUrXjqpaMY')
      );
      console.log('creating areas' + querySnapshot.data());
      let obj = querySnapshot.data();
      await setDoc(doc(db, 'studios'), querySnapshot.data());
    }

    fetchData();
  }, []);
  useEffect(() => {
    console.log(area1);
    async function fetchDataSub() {
      let arr = [];
      const querySnapshot = await getDoc(doc(db, 'studios', area1));
      let obj = querySnapshot.data();
      console.log(obj.substudios);
      console.log(value.docs.map((doc) => doc.data().name));
      if (obj.substudios !== undefined && obj.substudios.length > 0)
        setSubStudios([...obj.substudios]);
      else setSubStudios([]);
    }

    fetchDataSub();
  }, [area1]);
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
              tw`flex justify-center items-center bg-white w-[92%] h-[50%] max-w-[800px] rounded-md relative`,
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
              Choose your area:
            </Text>
            {!!value && (
              <SelectDropdown
                dropdownBackgroundColor={'white'}
                data={value.docs.map((doc) => doc.data().name)}
                defaultValue={''}
                onSelect={(selectedItem, index) => {
                  setArea(value.docs[index].id);
                  console.log(selectedItem, index, value.docs[index].id);
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
                  width:
                    dimensions.screen.width < 800
                      ? dimensions.screen.width * 0.92
                      : 800 * 0.92,
                  height: 40,
                  backgroundColor: '#FFF',
                  borderRadius: 999,
                  borderWidth: 2,
                  borderColor: '#C9AB78',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
                buttonTextStyle={{ color: '#444', textAlign: 'center' }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#C9AB78'}
                      size={18}
                      style={tw`absolute right-2 top-2`}
                    />
                  );
                }}
                dropdownStyle={{
                  backgroundColor: '#EFEFEF',
                  borderRadius: 8,
                  borderWidth: 1,
                  width:
                    dimensions.screen.width < 800
                      ? dimensions.screen.width * 0.92
                      : 800 * 0.92,
                  height: 300,
                  borderColor: '#C9AB78',
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
            )}
            {subStudios.length > 0 && (
              <View>
                <Text
                  style={tw`font-extrabold text-2xl text-center mt-3 text-[#3D1152]`}
                >
                  Choose your studio:
                </Text>
                <SelectDropdown
                  dropdownBackgroundColor={'white'}
                  data={subStudios}
                  defaultValue={''}
                  onSelect={(selectedItem, index) => {
                    setSelectedStudio(selectedItem);
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
                    width:
                      dimensions.screen.width < 800
                        ? dimensions.screen.width * 0.92
                        : 800 * 0.92,
                    height: 40,
                    backgroundColor: '#FFF',
                    borderRadius: 999,
                    borderWidth: 2,
                    borderColor: '#C9AB78',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                  buttonTextStyle={{ color: '#444', textAlign: 'center' }}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#C9AB78'}
                        size={18}
                        style={tw`absolute right-2 top-2`}
                      />
                    );
                  }}
                  dropdownStyle={{
                    backgroundColor: '#EFEFEF',
                    borderRadius: 8,
                    borderWidth: 1,
                    width:
                      dimensions.screen.width < 800
                        ? dimensions.screen.width * 0.92
                        : 800 * 0.92,
                    height: 300,
                    borderColor: '#C9AB78',
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
              </View>
            )}
            <Text
              style={[tw`font-extrabold text-2xl text-center mt-3 text-[#3D1152]`,{width:
                      dimensions.screen.width < 800
                        ? dimensions.screen.width * 0.92
                        : 800 * 0.92,
                    }]}
            >
              Telephone:
              <TextInput
                style={tw`mt-0 h-11 pl-3 w-full rounded-full border-2 border-[#C9AB78]`}
                placeholder="Enter Telephone number"
                keyboardType="numeric"
                onChangeText={(tel) => {
                  console.log(tel)
                  if (tel.length>phone.length){
                    if (tel.length>10) return;
                    if (parseInt(tel).toString()==tel) setPhone(tel);

                  }else setPhone(tel);
                }}
                value={phone}
              />
            </Text>
            {!!area1 && (
              <Btn
                onClick={(e) => {
                  e.preventDefault();
                  if (phone.length<10){
                    return onReturn("Please Enter valid 10 digit phone number");
                  }
                  if (area1 === "") {
                    return onReturn("Please select area");
                  }
                  if (selectedStudio === "" && subStudios.length > 0) {
                    onReturn("Please select a studio");
                  } else {
                    setCurrentArea(area1);
                    setCurrentProfile(selectedStudio, phone);
                    onReturn("Reload");
                  } 
                  }}
                title="Update your Profile"
                style={{ width: '92%', backgroundColor: '#3D1152' }}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default StudioSetModal;

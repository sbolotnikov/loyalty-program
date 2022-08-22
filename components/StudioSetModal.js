import { Modal, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import tw from 'twrnc';
import SelectDropdown from 'react-native-select-dropdown';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../firebase';
import useDimensions from '../hooks/useDimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useAuth from '../hooks/useAuth';
import Btn from './Btn';
function StudioSetModal({ vis, onReturn }) {
    const { dimensions } =useDimensions();
    const { setCurrentStudio } = useAuth();
    const [studio, setStudio] = useState('');
    const [value, loading, error] = useCollection(collection(db, 'studios'), {
        snapshotListenOptions: { includeMetadataChanges: true },
      });
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
              tw` justify-start items-center bg-white w-[92%] h-[32%] max-w-[800px] rounded-md relative`,
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
            {!!value &&<SelectDropdown
                    dropdownBackgroundColor={'white'}
                    data={value.docs.map((doc) => (doc.data().name))}
                    defaultValue={""}
                    onSelect={(selectedItem, index) => {
                        setStudio(value.docs[index].id)
                      console.log(
                        selectedItem, index, value.docs[index].id
                      );
                     
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
                      width: (dimensions.screen.width<800)?dimensions.screen.width*.92: 800*.92,
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 999,
                      borderWidth: 2,
                      borderColor: '#C9AB78',
                      justifyContent: 'center',
                      alignItems:'center',
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
                      width: (dimensions.screen.width<800)?dimensions.screen.width*.92: 800*.92,
                      height:300,
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
                  />}
                 {!!studio && <Btn
            onClick={()=>setCurrentStudio(studio)}
            title="Set this Studio"
            style={{ width: '92%', backgroundColor: '#3D1152' }}
          />}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default StudioSetModal;

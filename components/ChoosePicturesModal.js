import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
import SvgIcons from './svg/SvgIcons';
import { useEffect, useState } from 'react';
import TextBox from './TextBox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SelectList } from 'react-native-dropdown-select-list';
const ChoosePicturesModal = ({displayPics,galleryType, vis, onReturn }) => {
  const handleSubmit = (e, submitten) => {
    e.preventDefault();
    if (submitten="Save"){
      onReturn(displayPictures)
    }else onReturn([]);
  };
  
  const [displayPictures, setDisplayPictures] = useState([]);
  const [pictureLink, setPictureLink] = useState('');
  const [pictureLinkType, setPictureLinkType] = useState('Regular link');
  const [pictureText, setPictureText] = useState('');
  
  useEffect(() => {
    (displayPics) ?setDisplayPictures(displayPics):setDisplayPictures([]);
    console.log('start ');
  }, [displayPics]);
  console.log(displayPictures);
  return (
    <View style={tw` flex-1 justify-center items-center absolute top-0 left-0`}>
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
              tw` justify-center items-center bg-white w-[92%] h-[92%] max-w-[800px] rounded-md relative`,
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
              style={tw`px-1 py-2 border-2 border-solid border-transparent rounded-sm w-full m-1 text-center`}
            >
              Available pictures
            </Text>

            <View
              style={tw`w-[97%] h-28 relative overflow-scroll border border-black p-1 rounded-md`}
            >
              <View
                style={tw`absolute top-0 left-0  min-w-full h-full flex flex-wrap items-center justify-between`}
              >
                {displayPictures &&
                  displayPictures.map((item, i) => (
                    <TouchableOpacity
                      key={'picturescasting' + i}
                      style={tw`m-1 mr-4 flex flex-col items-start justify-around`}
                    >
                      <View style={tw`relative`}>
                        <View
                          style={tw` h-16 w-16 md:h-20 md:w-20 `}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Image
                            source={galleryType=="manual"?item.image:item}
                            style={tw`h-7 w-7 bg-gray-300 p-4 rounded-sm m-2`}
                          />
                        </View>
                        <View style={tw`absolute top-0 right-0`}>
                        <SvgIcons
                          icon={'DeleteIcon'}
                          color={'red'}
                          size={25}
                          onButtonPress={() =>{  
                            console.log('Clicked');
                            let arr=displayPictures;
                            arr.splice(i, 1)
                             setDisplayPictures([...arr])
                            }}
                        />
                        </View>
                        {galleryType=="manual" &&<Text style={tw`max-w-[100px] text-center`}>
                          {item.tag}
                        </Text>}
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
            <View style={tw`flex-col justify-center items-center mb-2 w-full`}>
            <Image
                            source={{uri:pictureLink}}
                            resizeMethod={'scale'}
                            resizeMode={'center'}
                            style={tw`h-16 w-16 bg-gray-300 rounded-sm m-1`}
                          />
                          <View
                style={tw`flex-row justify-center items-center mb-2 w-[50%]`}
              >
              <SelectList
                  
                  setSelected={(val) => {
                    setPictureLinkType(val);
                  }}
                  data={[ 'GDrive Link','Regular link']}
                  arrowicon={
                    <FontAwesome
                      name="chevron-down"
                      size={12}
                      color={'#776548'}
                    />
                  }
                  search={false}
                  boxStyles={{ width: 140,
                    height: 35,
                    backgroundColor: '#FFF',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#776548', }}
                />
                </View>
              <Text style={tw`font-semibold text-lg mt-1 text-[#344869]`}>
                Enter your picture link:
              </Text>
              
              <TextBox
                placeholder="Enter link"
                onChangeText={(text) => {
                  if (pictureLinkType === 'GDrive Link') {
                    // add logic to handle GDrive link
                    setPictureLink(`https://drive.google.com/thumbnail?id=${text.split('/file/d/')[1].split('/')[0]}&sz=w1000`); 
                  } else {
                    setPictureLink(text)
                  } 
                  }}
                secureTextEntry={false}
                value={pictureLink}
              />
              {galleryType=="manual" &&<Text style={tw`font-semibold text-lg mt-1 text-[#344869]`}>
                Choose text to picture:
              </Text>}
              {galleryType=="manual" &&<TextBox
                placeholder="Enter text"
                onChangeText={(text) => setPictureText(text)}
                secureTextEntry={false}
                value={pictureText}
              />}
              <Btn
              onClick={(e) =>{
                let pic={tag:pictureText,image:pictureLink};
                let arr=displayPictures;
                (galleryType=="manual")?arr.push(pic):arr.push(pictureLink)
                setDisplayPictures([...arr])
              }}
              title={'Add Picture'}
              style={{ width: '90%', backgroundColor: '#3D1152' }}
            />
              </View>
            <Btn
              onClick={(e) => handleSubmit(e, 'Save')}
              title={'Save Changes'}
              style={{ width: '90%', backgroundColor: '#3D1152' }}
            />
            <Btn
              onClick={(e) => handleSubmit(e, 'Close')}
              title={'Close'}
              style={{ width: '90%', backgroundColor: '#344869' }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChoosePicturesModal;

import { View, Text, Button } from 'react-native';
import Layout from '../components/layout';
import Btn from '../components/Btn';
import TextBox from '../components/TextBox';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-web';
import { deleteOldImage, pickImage } from '../util/functions';
import useAuth from '../hooks/useAuth';
import ChooseFiles from '../components/ChooseFiles';
import VideoPlayingModal from '../components/VideoPlayingModal';
import PlayerButtons from '../components/svg/PlayerButtons';
import { Buffer } from 'buffer';
import useCompetition from '../hooks/useCompetition';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeatDisplayModal from '../components/HeatDisplayModal';

const CompetitionScreen = () => {
  const { currentUser } = useAuth();
  const [videoFile, setVideoFile] = useState({ uri: '', name: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const {
    image,
    dates,
    currentHeat,
    name,
    message,
    id,
    programFileName,
    competitors,
    heatIDs,
    heatIndex,
    dances,
    items,
    records,
  } = useCompetition();

  function handleChange(text, eventName) {
    updateDoc(doc(db, 'competitions', id), {
      [eventName]: text,
    });
    // setCompArray((prev) => {
    //   return {
    //     ...prev,
    //     [eventName]: text,
    //   };
    // });
  }
  //convert RTF to txt NOT WORKING YET!!!
  function convertToPlain(rtf) {
    rtf = rtf.replace(/\\par[d]?/g, '');
    return rtf
      .replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, '')
      .trim();
  }
  //Function to check if it is single dance or Combination




  console.log(heatIDs, heatIndex);




  const nameOfDance = (str) => {
    let danceSet = [
      'Cha Cha',
      'Samba',
      'Rumba',
      'Paso Doble',
      'Jive',
      'Waltz',
      'Tango',
      'Viennese Waltz',
      'Foxtrot',
      'Quickstep',
      'Swing',
      'Bolero',
      'Mambo',
      'Argentine Tango',
      'Merengue',
      'West Coast Swing',
      'Salsa',
      'Hustle',
      'Bachata',
    ];
    for (let i = 0; i < danceSet.length; i++) {
      if (str.toLowerCase().includes(danceSet[i].toLowerCase()))
        return danceSet[i];
    }
    return '';
  };

  const onPressPicture = async (e) => {
    e.preventDefault();
    let picURL = await pickImage('competitions', '', 300);
    deleteOldImage('competitions', image);
    handleChange(picURL, 'image');
  };
  return (
    (heatIndex>-1)?<Layout>
      <VideoPlayingModal
        videoUri={videoFile.uri}
        button1={'Ok'}
        button2={''}
        heatNum={currentHeat}
        vis={modalVisible}
        onReturn={(ret) => setModalVisible(false)}
      />
      <HeatDisplayModal
        heatText={items[heatIndex]}
        button1={'Ok'}
        heatNum={currentHeat}
        vis={modal2Visible}
        onReturn={(ret) => setModal2Visible(false)}
      />
      <View
        style={{
          width: '100%',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        {currentUser.status == 'super' ? (
          <>
            <TextBox
              placeholder="Enter Competion Name"
              onChangeText={(text) => handleChange(text, 'name')}
              secureTextEntry={false}
              value={name}
            />
            <TextBox
              placeholder="Enter comp dates"
              onChangeText={(text) => handleChange(text, 'dates')}
              secureTextEntry={false}
              value={dates}
            />
          </>
        ) : (
          <>
            <View>
              <Text>{name}</Text>
            </View>
            <View>
              <Text>{dates}</Text>
            </View>
          </>
        )}

        {currentUser.status == 'super' ? (
          <View>
            <TouchableOpacity
              style={tw`w-[92%] h-48 m-1 `}
              onPress={(e) => onPressPicture(e)}
            >
              {image > '' ? (
                <View
                  style={[
                    tw` h-full w-full rounded-md`,
                    {
                      objectFit: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundImage: `url(${image})`,
                    },
                  ]}
                />
              ) : (
                <View style={tw` h-full w-full justify-center items-center`}>
                  <Text>Please click to choose image</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={tw` w-full flex-row justify-center items-start`}>
              <View>
                <ChooseFiles
                  fileType={'video/*'}
                  multiple={false}
                  label={'Choose Video'}
                  onFileChoice={(file) => {
                    setVideoFile({ uri: file.uri, name: file.name });
                  }}
                />

                <Text style={{ textAlign: 'center', fontStyle: 'oblique' }}>
                  {videoFile.name}
                </Text>
              </View>
              <View>
                <PlayerButtons
                  icon={'Play'}
                  color={'#776548'}
                  color2={'#C9AB78'}
                  size={40}
                  onButtonPress={() => setModalVisible(true)}
                />
                <Text style={{ textAlign: 'center', width: 45 }}>
                  Show Video
                </Text>
              </View>
              <View>
                <ChooseFiles
                  fileType={'text/*'}
                  multiple={false}
                  label={'Choose Program'}
                  onFileChoice={async (file) => {
                    let programBuffer = Buffer.from(
                      file.uri,
                      'base64'
                    ).toString('ascii');
                    handleChange(file.name, 'programFileName');

                    let decoded = programBuffer
                      .split('Heat 1b\x00\x06 b\x00\x06')[0]
                      .split('\n');
                    let str1 = [];
                    let competitors = [];
                    for (let i = 0; i < decoded.length; i++) {
                      str1 = decoded[i].split(' ');

                      if (str1[1] > 0)
                        competitors.push({
                          number1: str1[1],
                          nameFull: str1[2] + ' ' + str1[3].split('\t')[0],
                          studio: decoded[i].split('\t')[1],
                        });
                    }

                    decoded = programBuffer;
                    decoded =
                      ' Heat 1b\x00\x06 b\x00\x06' +
                      decoded.split('Heat 1b\x00\x06 b\x00\x06')[1];
                    decoded = decoded.split('b\x00\x06 b\x00\x06');

                    let arrayOfStrings = [];
                    let items = [];
                    let heatIDs = [];
                    let dances = [];
                    let cuttingTheEnd = 0;
                    for (let i = 1; i < decoded.length; i++) {
                      arrayOfStrings = decoded[i - 1].split('\n');
                      dances[i - 1] = decoded[i].split('\n')[0];
                      items[i - 1] =
                        arrayOfStrings[arrayOfStrings.length - 1] + decoded[i];
                      heatIDs[i - 1] =
                        arrayOfStrings[arrayOfStrings.length - 1];
                      cuttingTheEnd =
                        arrayOfStrings[arrayOfStrings.length - 1].length;
                      items[i - 1] = items[i - 1].slice(0, -cuttingTheEnd);
                    }
                    let records = [];
                    let group = '';
                    let heat = [];
                    let danceName = '';
                    for (let i = 0; i < items.length; i++) {
                      heat = items[i];
                      danceName = nameOfDance(dances[i]);
                      group = dances[i].replace(nameOfDance(dances[i]), '');
                      for (let j = 1; j < heat.split('\n').length; j++) {
                        let rec = heat.split('\n')[j];
                        if (heat.split('\n')[j].split('\t')[0] == ' ___') {
                          records.push(
                            heatIDs[i] +
                              ' ' +
                              danceName +
                              '  ' +
                              group +
                              ' ' +
                              rec.replace(' ___\t', '')
                          );

                          if (
                            competitors.findIndex(
                              (x) => x.nameFull === rec.split('\t')[3]
                            ) == -1
                          ) {
                            let person =
                              competitors[
                                competitors.findIndex(
                                  (x) => x.nameFull === rec.split('\t')[4]
                                )
                              ];
                            competitors.push({
                              number1: '',
                              nameFull: rec.split('\t')[3],
                              studio: person.studio,
                            });
                          } else if (
                            competitors.findIndex(
                              (x) => x.nameFull === rec.split('\t')[4]
                            ) == -1
                          ) {
                            let person =
                              competitors[
                                competitors.findIndex(
                                  (x) => x.nameFull === rec.split('\t')[3]
                                )
                              ];
                            competitors.push({
                              number1: '',
                              nameFull: rec.split('\t')[4],
                              studio: person.studio,
                            });
                          }
                        } else {
                          if (heat.split('\n')[j].length > 3)
                            group = heat.split('\n')[j];
                        }
                      }
                      group = '';
                    }
                    for (let i = 0; i < items.length; i++) {
                      items[i] = items[i].replace(/ ___\t/g, '');
                    }
                    handleChange(competitors, 'competitors');
                    handleChange(heatIDs, 'heatIDs');
                    handleChange(dances, 'dances');
                    handleChange(items, 'items');
                    handleChange(records, 'records');
                    //   records.filter(x => x.includes('Artur Aleksandrov'))
                  }}
                />
                <Text style={{ textAlign: 'center', fontStyle: 'oblique' }}>
                  {programFileName}
                </Text>
              </View>
            </View>
            <View>
              <ChooseFiles
                fileType={'text/*'}
                multiple={false}
                label={'Test rtf'}
                onFileChoice={ (file) => {

                  let tempFile=convertToPlain(file.uri)
                  let programBuffer = Buffer.from(tempFile, 'base64').toString(
                    'ascii'
                  );
                  programBuffer=programBuffer.replace(/\{|\}/g, "")
                  // programBuffer=programBuffer.replace(/\par}/g, "{n}")
                  // programBuffer=programBuffer.replace(/\tab}/g, "{t}") 
                  // programBuffer=programBuffer.replace(/\pard \keep\keepn/g, " {heatstart} ")  
                  // console.log(programBuffer)
                  programBuffer=programBuffer.replace(/\\\w+/g, "")
                  // programBuffer=programBuffer.replace(/{t}/g, "\t")
                  // programBuffer=programBuffer.replace(/{n}/g, "\n")
                  console.log(programBuffer)
                  let str1 = [];
                    let competitors = [];
                    let decoded=[];
                    decoded =
                      programBuffer.split('Heat 1 ')[0]; 
                      decoded = decoded.split('List of Gentleman Professionals')[1];
                      decoded= decoded.split('\n').splice(2, 1)+ decoded.split('\n').splice(6, 1)
                      // decoded=decoded
                      console.log(decoded)
                    for (let i = 0; i < decoded.length; i++) {
                      str1 = decoded[i].split(' ');

                      if (str1[1] > 0)
                        competitors.push({
                          number1: str1[1],
                          nameFull: str1[2] + ' ' + str1[3].split('\t')[0],
                          studio: decoded[i].split('\t')[1],
                        });
                    }
                        
                    decoded =
                      ' Heat 1 ' +
                      programBuffer.split('Heat 1 ')[1];
                      // console.log(decoded)
                    decoded = decoded.split('\r\n   \r\n \r\n   ');
                    console.log(decoded)
                    let arrayOfStrings = [];
                    let items = [];
                    let heatIDs = [];
                    let dances = [];
                    let cuttingTheEnd = 0;
                    for (let i = 1; i < decoded.length; i++) {
                      arrayOfStrings = decoded[i - 1].split('\n');
                      dances[i - 1] = decoded[i].split('\n')[0];
                      items[i - 1] =
                        arrayOfStrings[arrayOfStrings.length - 1] + decoded[i];
                      heatIDs[i - 1] =
                        arrayOfStrings[arrayOfStrings.length - 1];
                      cuttingTheEnd =
                        arrayOfStrings[arrayOfStrings.length - 1].length;
                      items[i - 1] = items[i - 1].slice(0, -cuttingTheEnd);
                    }
                    let records = [];
                    let group = '';
                    let heat = [];
                    let danceName = '';
                    for (let i = 0; i < items.length; i++) {
                      heat = items[i];
                      danceName = nameOfDance(dances[i]);
                      group = dances[i].replace(nameOfDance(dances[i]), '');
                      for (let j = 1; j < heat.split('\n').length; j++) {
                        let rec = heat.split('\n')[j];
                        if (heat.split('\n')[j].split('\t')[0] == ' ___') {
                          records.push(
                            heatIDs[i] +
                              ' ' +
                              danceName +
                              '  ' +
                              group +
                              ' ' +
                              rec.replace(' ___\t', '')
                          );

                          if (
                            competitors.findIndex(
                              (x) => x.nameFull === rec.split('\t')[3]
                            ) == -1
                          ) {
                            let person =
                              competitors[
                                competitors.findIndex(
                                  (x) => x.nameFull === rec.split('\t')[4]
                                )
                              ];
                            competitors.push({
                              number1: '',
                              nameFull: rec.split('\t')[3],
                              studio: person.studio,
                            });
                          } else if (
                            competitors.findIndex(
                              (x) => x.nameFull === rec.split('\t')[4]
                            ) == -1
                          ) {
                            let person =
                              competitors[
                                competitors.findIndex(
                                  (x) => x.nameFull === rec.split('\t')[3]
                                )
                              ];
                            competitors.push({
                              number1: '',
                              nameFull: rec.split('\t')[4],
                              studio: person.studio,
                            });
                          }
                        } else {
                          if (heat.split('\n')[j].length > 3)
                            group = heat.split('\n')[j];
                        }
                      }
                      group = '';
                    }
                    for (let i = 0; i < items.length; i++) {
                      items[i] = items[i].replace(/ ___\t/g, '');
                    }

                }}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
        <TextBox
          placeholder="Enter urgent message"
          onChangeText={(text) => handleChange(text, 'message')}
          secureTextEntry={false}
          value={message}
        />
        <View
          style={tw`flex-row justify-center items-center flex-wrap w-[95%]`}
        >
          <View style={tw`flex-col justify-center items-center mb-2 w-full`}>
            <Text style={tw`font-semibold text-lg mt-3 text-[#344869]`}>
              Current Heat:
            </Text>
            <TextBox
              placeholder="Enter current heat number"
              onChangeText={(text) => handleChange(text, 'currentHeat')}
              secureTextEntry={false}
              value={currentHeat}
            />
            <Text style={tw`font-semibold text-lg mt-3 text-[#344869]`}>
              Choose current Heat
            </Text>
            <View style={tw`flex-row justify-center items-center mb-2 w-[50%]`}>
              <SelectDropdown
                dropdownBackgroundColor={'white'}
                data={heatIDs}
                defaultValue={heatIndex}
                onSelect={(selectedItem, index) => {
                  handleChange(selectedItem, 'currentHeat');
                  handleChange(index, 'heatIndex');
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
                  width: 140,
                  height: 35,
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
                      size={14}
                    />
                  );
                }}
                dropdownStyle={{
                  backgroundColor: '#EFEFEF',
                  borderRadius: 8,
                  borderWidth: 1,
                  width: 140,
                  borderColor: '#776548',
                }}
                rowStyle={{
                  backgroundColor: '#EFEFEF',
                  height: 45,
                  borderBottomColor: '#C5C5C5',
                }}
                rowTextStyle={{
                  color: '#444',
                  textAlign: 'center',
                  margin: 'auto',
                  textSize: 18,
                }}
              />
              <PlayerButtons
                icon={'List'}
                color={'#776548'}
                color2={'#C9AB78'}
                size={40}
                onButtonPress={() => setModal2Visible(true)}
              />
            </View>
          </View>
        </View>
        <View
          style={tw`flex-row justify-around items-center flex-wrap w-[92%]`}
        >
          <Btn
            onClick={(e) => {
              console.log(heatIndex);
              if (heatIndex > 0) {
                handleChange(heatIndex - 1, 'heatIndex');
                handleChange(heatIDs[heatIndex - 1], 'currentHeat');
              }
            }}
            title="Previous"
            style={{ width: '48%', backgroundColor: '#3D1152', marginTop: 0 }}
          />
          <Btn
            onClick={() => {
              console.log(heatIndex);
              if (heatIndex < heatIDs.length - 1) {
                handleChange(heatIndex + 1, 'heatIndex');
                handleChange(heatIDs[heatIndex + 1], 'currentHeat');
              }
              // handleChange(
              //   (currentHeat.match(/\d+/g) * 1 + 1).toString(),
              //   'currentHeat'
              // );
            }}
            title="Next"
            style={{ width: '48%', backgroundColor: '#344869', marginTop: 0 }}
          />
        </View>
      </View>
    </Layout>:<></>
  );
};

export default CompetitionScreen;

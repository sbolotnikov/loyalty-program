import { View, Text } from 'react-native';
import Layout from '../components/layout';
import Btn from '../components/Btn';
import TextBox from '../components/TextBox';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-web';
import {
  deleteOldImage,
  getPositionOfSubstring,
  getStudioFullName,
  pickImage,
} from '../util/functions';
import useAuth from '../hooks/useAuth';
import ChooseFiles from '../components/ChooseFiles';
import VideoPlayingModal from '../components/VideoPlayingModal';
import PlayerButtons from '../components/svg/PlayerButtons';
import { Buffer } from 'buffer';
import useCompetition from '../hooks/useCompetition';
import SelectDropdown from 'react-native-select-dropdown';
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeatDisplayModal from '../components/HeatDisplayModal';
import CompetitionChoiceModal from '../components/CompetitionChoiceModal';
import CountBox from '../components/CountBox';
import ChoosePicturesModal from '../components/choosePicturesModal';
// import ChooseFilePath from '../components/ChooseFilePath';

const CompetitionScreen = () => {
  const { currentUser } = useAuth();
  const [videoFile, setVideoFile] = useState({ uri: '', name: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [galleryType, setGalleryType] = useState(null);
  const [galleryArr, setGalleryArr] = useState(null);

  useEffect(() => {
    setModal1Visible(true);
  }, []);

  const {
    image,
    dates,
    currentHeat,
    name,
    message,
    id,
    programFileName,
    heatIDs,
    heatIndex,
    items,
    mode,
    fontSize,
    displayedPictures,
    displayedPicturesAuto,
    seconds,
    manualPicture,
    setCompID,
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
  function convertToPlain(rtf) {
    rtf = rtf.replace(/\\par[d]?/g, '');
    return rtf
      .replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, '')
      .trim();
  }
  //Function to check if it is single dance or Combination

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
  return heatIndex > -1 ? (
    <View
      style={[
        tw` flex-1 justify-center items-center w-[100%] h-[100%] absolute top-0 left-0`,
        { overflow: 'hidden' },
      ]}
    >
      <HeatDisplayModal
        heatText={items[heatIndex]}
        button1={'Ok'}
        heatNum={currentHeat}
        vis={modal2Visible}
        onReturn={(ret) => setModal2Visible(false)}
      />
      <VideoPlayingModal
        videoUri={videoFile.uri}
        heatText={items[heatIndex]}
        manualPicture={manualPicture}
        displayedPicturesAuto={displayedPicturesAuto}
        button1={'Ok'}
        compName={name}
        heatNum={currentHeat}
        vis={modalVisible}
        mode={mode}
        fontSize={fontSize}
        seconds={seconds}
        onReturn={(ret) => setModalVisible(false)}
      />
      {galleryType && (
        <ChoosePicturesModal
          displayPics={galleryArr}
          galleryType={galleryType}
          vis={modal3Visible}
          onReturn={(ret) => {
            if (ret && ret.length > 0) {
              galleryType == 'auto'
                ? handleChange(ret, 'displayedPicturesAuto')
                : handleChange(ret, 'displayedPictures');
            }
            setModal3Visible(false);
          }}
        />
      )}
      <Layout>
        <View
          style={{
            width: '100%',
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            overflowY: 'scroll',
          }}
        >
          {currentUser.status == 'admin' ? (
            <View style={[tw`mt-12 w-full`]}>
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
            </View>
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

          {currentUser.status == 'admin' ? (
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
                <View style={tw` flex-col justify-center items-center`}>
                  <SelectDropdown
                    dropdownBackgroundColor={'white'}
                    data={['Auto', 'Video', 'Heats', 'Manual', 'Default']}
                    defaultValue={mode}
                    onSelect={(selectedItem, index) => {
                      handleChange(selectedItem, 'mode');
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
                  <Text style={{ textAlign: 'center', width: 130 }}>
                    Choose casting mode
                  </Text>
                </View>
                <View>
                  <CountBox
                    startValue={
                      parseInt(fontSize) > 0 ? parseInt(fontSize) : 34
                    }
                    setWidth={4}
                    onChange={(num) => {
                      console.log(num);
                      handleChange(num, 'fontSize');
                    }}
                  />
                  <Text style={{ textAlign: 'center', width: 90 }}>
                    Choose font size
                  </Text>
                </View>
                <View>
                  <CountBox
                    startValue={parseInt(seconds) > 0 ? parseInt(seconds) : 10}
                    setWidth={4}
                    onChange={(num) => {
                      console.log(num);
                      handleChange(num, 'seconds');
                    }}
                  />
                  <Text style={{ textAlign: 'center', width: 95 }}>
                    Choose seconds/frame
                  </Text>
                </View>
              </View>
              {displayedPictures && (
                <View style={tw` w-full flex-col justify-center items-center`}>
                  <SelectDropdown
                    dropdownBackgroundColor={'white'}
                    data={displayedPictures
                      .sort(function (a, b) {
                        return b.tag == a.tag ? 0 : b.tag > a.tag ? -1 : 1;
                      })
                      .map((item) => item.tag)}
                    defaultValue={manualPicture ? manualPicture.name : ''}
                    onSelect={(selectedItem, index) => {
                      handleChange(
                        {
                          name: selectedItem,
                          link: displayedPictures.sort(function (a, b) {
                            return b.tag == a.tag ? 0 : b.tag > a.tag ? -1 : 1;
                          })[index].image,
                        },
                        'manualPicture'
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
                      width: 240,
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
                      width: 240,
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
                  <Text style={{ textAlign: 'center', width: 195 }}>
                    Choose Picture for manual
                  </Text>
                </View>
              )}
              <View style={tw` w-full flex-row justify-center items-start`}>
                <View style={tw` flex-col justify-center items-center`}>
                  <PlayerButtons
                    icon={'List'}
                    color={'#776548'}
                    color2={'#C9AB78'}
                    size={40}
                    onButtonPress={() => {
                      setGalleryType('manual');
                      if (displayedPictures)
                        setGalleryArr([...displayedPictures]);
                      setModal3Visible(true);
                    }}
                  />
                  <Text style={{ textAlign: 'center', width: 85 }}>
                    Choose pictures for manual
                  </Text>
                </View>
                <View style={tw` flex-col justify-center items-center`}>
                  <PlayerButtons
                    icon={'List'}
                    color={'#776548'}
                    color2={'#C9AB78'}
                    size={40}
                    onButtonPress={() => {
                      setGalleryType('auto');
                      if (displayedPicturesAuto)
                        setGalleryArr([...displayedPicturesAuto]);
                      setModal3Visible(true);
                    }}
                  />
                  <Text style={{ textAlign: 'center', width: 85 }}>
                    Choose pictures for auto
                  </Text>
                </View>
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
                    Start Show
                  </Text>
                </View>

                <View>
                  {/* <ChooseFilePath /> */}
                  <ChooseFiles
                    fileType={'text/*'}
                    multiple={false}
                    label={'Choose Program'}
                    onFileChoice={(file) => {
                      console.log(file);
                      let tempFile = convertToPlain(file.uri);
                      let programBuffer = Buffer.from(
                        tempFile,
                        'base64'
                      ).toString('ascii');
                      handleChange(file.name, 'programFileName');
                      programBuffer = programBuffer.replace(/\{|\}/g, '');
                      programBuffer = programBuffer.replace(/\\\w+/g, '');
                      let str1 = [];
                      let st = '';
                      let competitors = [];
                      let decoded = [];
                      decoded = programBuffer.split('Heat 1 ')[0];
                      decoded = decoded.split('List of Studios')[1];
                      decoded = decoded.split(
                        'List of Gentleman Professionals'
                      )[0];
                      // decoded = decoded.split('\r\n    \r\n   ')[1];
                      decoded = decoded.split('\r\n');
                      decoded = decoded.filter((elm) => elm.trim());
                      decoded = decoded.filter((elm) => elm);
                      let studios = [];
                      for (let i = 0; i < decoded.length; i++) {
                        if (decoded[i].trim() > '')
                          studios.push(decoded[i].trim().replace(',', ''));
                      }

                      decoded = programBuffer.split('Heat 1 ')[0];
                      decoded = decoded.split(
                        'List of Gentleman Professionals'
                      )[1];

                      decoded = decoded.split('List of Gentleman Amateurs')[0];
                      decoded = decoded.split('\r\n');
                      decoded = decoded.filter((elm) => elm);
                      let partArr = [];
                      for (let i = 0; i < decoded.length; i++) {
                        if (decoded[i].trim() > '')
                          partArr.push(decoded[i].trim().replace(',', ''));
                      }
                      console.log(decoded);
                      let role1 = 'Pro';
                      for (let i = 0; i < partArr.length; i++) {
                        str1 = partArr[i];
                        str1 = str1.split(' ');
                        st = partArr[i];
                        competitors.push({
                          number1: str1[0],
                          nameFull: st
                            .substring(
                              st.indexOf(' '),
                              getPositionOfSubstring(studios, st)
                            )
                            .trim(),
                          studio: getStudioFullName(
                            studios,
                            st
                              .substring(getPositionOfSubstring(studios, st))
                              .trim()
                          ),
                          role: role1,
                        });
                      }
                      decoded = programBuffer.split('Heat 1 ')[0];
                      decoded = decoded.split('List of Gentleman Amateurs')[1];
                      decoded = decoded.split('\r\n');
                      decoded = decoded.filter((elm) => elm);
                      partArr = [];
                      for (let i = 0; i < decoded.length; i++) {
                        if (decoded[i].trim() > '')
                          partArr.push(decoded[i].trim().replace(',', ''));
                      }
                      console.log(decoded);
                      role1 = 'Am';
                      for (let i = 0; i < partArr.length; i++) {
                        str1 = partArr[i];
                        str1 = str1.split(' ');
                        st = partArr[i];
                        if (parseInt(str1[0]) > 0)
                          competitors.push({
                            number1: str1[0],
                            nameFull: st
                              .substring(
                                st.indexOf(' '),
                                getPositionOfSubstring(studios, st)
                              )
                              .trim(),
                            studio: getStudioFullName(
                              studios,
                              st
                                .substring(getPositionOfSubstring(studios, st))
                                .trim()
                            ),
                            role: role1,
                          });
                      }

                      decoded = programBuffer.split('Heat 1 ')[1];
                      decoded = decoded.split('Heat');
                      decoded[0] = ' 1 ' + decoded[0];
                      for (let i = 0; i < decoded.length; i++) {
                        decoded[i] = 'Heat' + decoded[i];

                        let sss1 = decoded[i].split(' \r\n   Solo ');
                        if (sss1.length > 1) {
                          decoded[i] = sss1[0];
                          for (let j = 1; j < sss1.length; j++) {
                            decoded.splice(i + 1, 0, 'Solo ' + sss1[j]);
                            i++;
                          }
                        }
                      }
                      let decodedSize = decoded.length;
                      for (let i = decodedSize - 1; i >= 0; i--) {
                        if (decoded[i].indexOf('Awards') > -1)
                          decoded.splice(i + 1, 0, 'Awards');
                      }

                      let arrayOfStrings = [];
                      let items = [];
                      let heatIDs = [];
                      let dances = [];
                      for (let j = 0; j < decoded.length; j++) {
                        arrayOfStrings = decoded[j].split('\r\n');
                        dances[j] = decoded[j].split('\r\n')[0];
                        items[j] = decoded[j].split('\r\n');
                        heatIDs[j] = arrayOfStrings[0].split('  ')[0];
                        dances[j] = dances[j].replace(heatIDs[j] + '  ', '');
                      }
                      let records = [];
                      let program = [];
                      let group = '';
                      let heat = [];
                      let danceName = '';
                      let timeOfHeat = '';
                      for (let i = 0; i < items.length; i++) {
                        heat = items[i];
                        danceName = nameOfDance(dances[i]);
                        group = dances[i].replace(nameOfDance(dances[i]), '');
                        if (heatIDs[i] !== 'Awards') {
                          if (timeOfHeat.indexOf('[') > -1) {
                            timeOfHeat = heatIDs[i].split('[')[1];
                            timeOfHeat = timeOfHeat.split(']')[0];
                          } else timeOfHeat = '';
                        } else timeOfHeat = '';
                        heatIDs[i] = heatIDs[i].split('[')[0];
                        for (let k = 1; k < heat.length - 1; k++) {
                          let rec = heat[k];
                          if (heat[k].indexOf(' ___') > -1) {
                            records.push(
                              timeOfHeat +
                                ' ' +
                                heatIDs[i] +
                                ' ' +
                                danceName +
                                '\n' +
                                rec.replace('  ___ ', '') +
                                '\n' +
                                group
                            );
                            rec = rec
                              .replace('  ___ ', '')
                              .replaceAll(',', '')
                              .trim();
                            let p = 0;
                            // rec=rec.replace(',','')
                            let studio1 = getStudioFullName(studios, rec);
                            let event1 = group + ' ' + rec.split(' ')[0];
                            if (rec.split(' ')[1] == '') {
                              rec = rec.slice(
                                0,
                                getPositionOfSubstring(studios, rec)
                              );
                              p = 0;
                              while (
                                rec.indexOf(competitors[p].nameFull) < 0 &&
                                p < competitors.length
                              ) {
                                p++;
                              }
                            } else {
                              while (
                                rec.indexOf(competitors[p].number1) < 0 &&
                                p < competitors.length
                              ) {
                                p++;
                              }
                            }
                            rec = rec.split(studio1)[0];
                            console.log(rec.split(' ')[0]);
                            let eventGroup = rec.split(' ')[0];
                            if (rec.split(' ')[1] == '')
                              rec = rec.split(rec.split(' ')[0])[1];
                            else rec = rec.split(competitors[p].number1)[1];
                            rec = rec
                              .replace(competitors[p].nameFull, '')
                              .trim();
                            if (eventGroup.indexOf('G') > -1)
                              program.push({
                                heat: heatIDs[i],
                                number: competitors[p].number1,
                                competitor1: competitors[p].nameFull,
                                competitor2: rec,
                                studio: studio1,
                                event: event1,
                              });
                            else
                              program.push({
                                heat: heatIDs[i],
                                number: competitors[p].number1,
                                competitor2: competitors[p].nameFull,
                                competitor1: rec,
                                studio: studio1,
                                event: event1,
                              });
                            if (
                              competitors.findIndex(
                                (x) => x.nameFull === rec
                              ) == -1
                            ) {
                              if (eventGroup.indexOf('G') > -1)
                                competitors.push({
                                  number1: '',
                                  nameFull: rec,
                                  studio: studio1,
                                  role: 'Pro',
                                });
                              if (
                                eventGroup.indexOf('L') > -1 ||
                                eventGroup.indexOf('AC') > -1
                              )
                                competitors.push({
                                  number1: '',
                                  nameFull: rec,
                                  studio: studio1,
                                  role: 'Am',
                                });
                            }
                          } else {
                            if (heat[k].length > 3) group = heat[k].trim();
                          }
                        }
                        group = '';
                      }
                      let item = '';
                      for (let i = 0; i < items.length; i++) {
                        item = '';
                        for (let j = 0; j < items[i].length; j++)
                          item += items[i][j] + '\n';
                        items[i] = item.replaceAll(/ ___ /g, '');
                      }

                      handleChange(competitors, 'competitors');
                      handleChange(heatIDs, 'heatIDs');
                      handleChange(dances, 'dances');
                      handleChange(items, 'items');
                      handleChange(records, 'records');
                      handleChange(program, 'program');
                      handleChange(studios, 'studios');
                    }}
                  />
                  <Text style={{ textAlign: 'center', fontStyle: 'oblique' }}>
                    {programFileName}
                  </Text>
                </View>
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
              <View
                style={tw`flex-row justify-center items-center mb-2 w-[50%]`}
              >
                <SelectList
                  selected={currentHeat}
                  setSelected={(val) => {
                    console.log(val,heatIDs.indexOf(val));
                    
                    handleChange(val, 'currentHeat');
                    handleChange(heatIDs.indexOf(val), 'heatIndex');
                  }}
                  data={heatIDs}
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
                    borderColor: '#776548', }} //override default styles //default selected option
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
      </Layout>
    </View>
  ) : (
    <CompetitionChoiceModal
      button1={'Ok'}
      button2={''}
      vis={modal1Visible}
      onReturn={(ret) => setModal1Visible(false)}
    />
  );
};

export default CompetitionScreen;

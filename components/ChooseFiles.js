import useState from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
 
// Import Document Picker
import * as DocumentPicker from 'expo-document-picker'

const ChooseFiles = ({onFileChoice}) => {
  
 
  const selectOneFile = async () => {
    try {
        let res = await DocumentPicker.getDocumentAsync({
            type: 'audio/*', multiple: false});  
 
      console.log('res : ' + JSON.stringify(res));
    //   console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      onFileChoice(res)
    } catch (err) {
      //Handling any exception (If any)
      if (err.type=='cancel') {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
 
  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {

      const results = await DocumentPicker.getDocumentAsync({
        type: 'audio/*', multiple: true
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log( res);
        // console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
    //   setMultipleFile(results);
    } catch (err) {
      //Handling any exception (If any)
      console.log(err)
      if (err.type=='cancel') {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectOneFile}>
          <Text style={{marginRight: 10, fontSize: 19}}>
            Click here to pick one file
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChooseFiles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },

    buttonStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#DDDDDD',
      padding: 5,
    },
    imageIconStyle: {
      height: 20,
      width: 20,
      resizeMode: 'stretch',
    },
  });
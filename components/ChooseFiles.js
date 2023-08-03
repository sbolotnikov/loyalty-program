import useState from 'react';
// Import required components
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

// Import Document Picker
import * as DocumentPicker from 'expo-document-picker';
import PlayerButtons from './svg/PlayerButtons';

const ChooseFiles = ({ fileType, multiple, label, onFileChoice }) => {
  const selectOneFile = async () => {
    try {
      let res = await DocumentPicker.getDocumentAsync({
        type: fileType,
        multiple: multiple,
      });
 
      onFileChoice(res);
    } catch (err) {
      //Handling any exception (If any)
      if (err.type == 'cancel') {
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
        type: 'audio/*',
        multiple: true,
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log(res);
        // console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      //Setting the state to show multiple file attributes
      //   setMultipleFile(results);
    } catch (err) {
      //Handling any exception (If any)
      console.log(err);
      if (err.type == 'cancel') {
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
      <View style={styles.container}>
        
        <PlayerButtons
          icon={'File'}
          color={'#776548'}
          color2={'#C9AB78'}
          size={40}
          onButtonPress={() => selectOneFile()}
        />
        <Text  style={{ fontSize: 15, textAlign:'center', width: 58  }}>{label}</Text>
      </View>
  
  );
};

export default ChooseFiles;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15
  },
});

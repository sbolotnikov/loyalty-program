
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import { View, Text, FlatList } from 'react-native'

const ChooseFilePath = () => {
    const [documentsFolder, setDocumentsFolder] = useState('');
    const [downloadsFolder, setDownloadsFolder] = useState('');
    const [files, setFiles] = useState([]);

    const getFileContent = async (path) => {
      const reader = await RNFS.readDir(path);
      setFiles(reader);
    };
    useEffect(() => {
      //get user's file paths from react-native-fs
      setDownloadsFolder(RNFS.DownloadDirectoryPath);
      setDocumentsFolder(RNFS.DocumentDirectoryPath); //alternative to MainBundleDirectory.
      getFileContent(RNFS.DocumentDirectoryPath); 
    }, []);
    const Item = ({ name, isFile }) => {
        return (
          <View>
            <Text style={styles.name}>Name: {name}</Text>
            <Text> {isFile ? "It is a file" : "It's a folder"}</Text>
          </View>
        );
      };
      const renderItem = ({ item, index }) => {
        return (
          <View>
            <Text style={styles.title}>{index}</Text>
            {/* The isFile method indicates whether the scanned content is a file or a folder*/}
            <Item name={item.name} isFile={item.isFile()} />
          </View>
        );
      };
 

    return (
        <View>
        <Text> Downloads Folder: {downloadsFolder}</Text>
        <Text>Documents folder: {documentsFolder}</Text>

        <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      </View>
    );
}

export default ChooseFilePath;
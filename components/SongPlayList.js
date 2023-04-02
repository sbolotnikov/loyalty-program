import { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';

const SongPlayList = ({onSongChoice}) => {
    const { currentUser } = useAuth();
    useEffect(() => {
      async function fetchData() {
        try {
          const value = await AsyncStorage.getItem(currentUser.uid);
          console.log("value :",value)
          if(value !== null) {
            console.log(value)
          }
        } catch(e) {
            console.log(e);
        }
      }
      fetchData()
      }, [])
  return (
    <View>
      <Text>SongPlayList</Text>
    </View>
  )
}

export default SongPlayList
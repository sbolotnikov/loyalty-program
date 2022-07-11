import { View, Text, Dimensions, Image, Pressable, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
const window = Dimensions.get("window");
const Homescreen = () => {
  const [dimensions, setDimensions] = useState({ window });
  const navigation = useNavigation();
  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener(
  //     "change",
  //     ({ window }) => {
  //       setDimensions({ window });
  //     }
  //   );
  //   return () => subscription?.remove();
  // });
    
  return (
    <Layout > 
    {/* Header */}
        <View className=" w-full flex justify-center items-center" style={{background: 'rgb(0,204,187)',
background: 'radial-gradient(circle, rgba(0,204,187,1) 0%, rgba(6,182,212,1) 100%)', height:`${dimensions.window.height-56}px`}}>
          <Image
            // source={{ uri: 'https://links.papareact.com/wru',}}
            source={require('../assets/icon.png')}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="text-bold text-xl">
            Home
          </Text>
          <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Calendar',)
      }
    />
        </View>

    </Layout>
  );
};

export default Homescreen;

import { View, Text, Image, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import QRCode from "react-qr-code";
import useAuth from '../hooks/useAuth';
// import QRCode from 'react-native-qrcode-svg';
const Homescreen = () => {
  const navigation = useNavigation();
  const logo=require('../assets/dancerslogo.png');
  const {currentUser}=useAuth();
  return (
    <Layout > 
    {/* Header */}
          <Image
            source={logo}
            style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
          />
           {/* <QRCode
      value="Just some string value"
      logo={logo}
    /> */}
    <View style={{ background: 'white', padding: '16px' }}>
    <QRCode value={currentUser.uid} size={300} />
</View>
          <Text style={tw`font-bold text-xl`}>
            Home
          </Text>
          <Button
      title="Go to scanner"
      onPress={() =>
        navigation.navigate('Scan',)
      }
    />

    </Layout>
  );
};

export default Homescreen;

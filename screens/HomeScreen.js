import { View, Text, Image, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
const Homescreen = () => {
  const navigation = useNavigation();
  const logo=require('../assets/dancerslogo.png');

  return (
    <Layout > 
    {/* Header */}
          <Image
            source={logo}
            style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
          />
          <Text style={tw`text-bold text-xl`}>
            Home
          </Text>
          <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Calendar',)
      }
    />

    </Layout>
  );
};

export default Homescreen;

import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
const Calendarscreen = () => {
  const navigation = useNavigation();

  return (
    <Layout>
          <Text style={tw`font-bold text-xl`}>Calendar Screen</Text>
          {/* Body */}
    </Layout>
  );
};

export default Calendarscreen;

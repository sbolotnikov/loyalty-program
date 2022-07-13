import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
const Calendarscreen = () => {
  const navigation = useNavigation();

  return (
    <Layout>
          <Text className="text-bold text-xl">Calendar Screen</Text>
          {/* Body */}
    </Layout>
  );
};

export default Calendarscreen;

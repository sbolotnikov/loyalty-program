import { View, Text, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
const Activityscreen = () => {
  const navigation = useNavigation();

  return (
    <Layout>

          <Image
            source={require('../assets/icon.png')}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="text-bold text-xl">Activity Screen</Text>

    </Layout>
  );
};

export default Activityscreen;

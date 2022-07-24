import { View, Text,Button, Image } from 'react-native'
import React from 'react'
import Layout from '../components/layout'
import tw from 'twrnc';
import useAuth from '../hooks/useAuth';
const Profilescreen = () => {
  const {currentUser,logout}=useAuth();

  return (
    <Layout>
          <Image
            source={currentUser.photoURL}
            style={tw`h-20 w-20 bg-gray-300 p-4 rounded-full`}
          />
          <Text style={tw`text-bold text-xl`}>
            {currentUser.displayName}
          </Text>
          <Button
      title="Log out"
      onPress={() =>logout()}
    />
  </Layout>

  )
}

export default Profilescreen
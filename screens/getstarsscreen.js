import { View, Text, Image } from 'react-native'
import React from 'react'
import Layout from '../components/layout'

const Getstarsscreen = () => {
  return (
    <Layout>
    <View
      className=" w-full flex justify-center items-center"
  
    >
      <Image
        source={require('../assets/icon.png')}
        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
      />
      <Text className="text-bold text-xl">GetStarsScreen</Text>
    </View>

    {/* Body */}
  </Layout>

  )
}

export default Getstarsscreen
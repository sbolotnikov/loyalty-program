import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Layout from '../components/layout';
import tw from 'twrnc';
import useAuth from '../hooks/useAuth';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import { storage } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';

import { ref, uploadString } from "firebase/storage";
const Profilescreen = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const [visEdit, setVisEdit] = useState(false);
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    pwd: '',
    pwd2: '',
    name: currentUser.displayName,
    image: currentUser.photoURL,
  });

  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    console.log(result.uri);
    const manipResult = await manipulateAsync(
      result.uri,
      [{resize:{ width: 300 }}],
      { format: "png" }
    );
    console.log(manipResult)
    // const storageRef = ref(storage, 'some-child');

  };

  return (
    <Layout>
      <Text style={tw`text-4xl font-extrabold mb-2 text-[#0B3270]`}>
        Profile of {currentUser.status}
      </Text>
      <View style={tw`w-full max-w-4xl justify-center items-center`}>
        <View style={tw`flex-row w-[92%] justify-between`}>
          <View style={tw`w-[70%]`}>
            {visEdit ? (
              <TextBox
                defaultValue={values.name}
                onSubmitEditing={() => setVisEdit(false)}
                onChangeText={(text) => handleChange(text, 'name')}
              />
            ) : (
              <Text
                style={tw`text-2xl font-extrabold mb-2 text-[#0B3270]`}
                onPress={() => setVisEdit(true)}
              >
                {values.name}
              </Text>
            )}
            <Text style={tw`text-bold text-xl`}>{currentUser.email}</Text>
          </View>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={values.image}
              style={tw`h-20 w-20 bg-gray-300 p-4 rounded-full`}
            />
          </TouchableOpacity>
        </View>
        <Text style={tw`text-red-600 text-xl ${error ? 'flex' : 'hidden'}`}>
          {error ? error : ''}
        </Text>
        <Text
          style={tw`text-yellow-400 text-xl ${message ? 'flex' : 'hidden'}`}
        >
          {message ? message : ''}
        </Text>

        <TextBox
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => handleChange(text, 'pwd')}
        />
        <TextBox
          placeholder="Confirme Password"
          secureTextEntry={true}
          onChangeText={(text) => handleChange(text, 'pwd2')}
        />
        <Btn
          onClick={() => navigation.navigate('Resetpass')}
          title="Save changes"
          style={{ width: '48%', backgroundColor: '#0B3270' }}
        />
        <Btn
          onClick={() => logout()}
          title="Log out"
          style={{ width: '48%', backgroundColor: '#344869' }}
        />
      </View>
    </Layout>
  );
};

export default Profilescreen;

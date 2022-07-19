import { View, Text, Button, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import validateEmail from '../util/functions';
import tw from 'twrnc';
const ResetScreen = () => {

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const [values, setValues] = useState({
    email: ''
  });

  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
    
  }

  function Login() {
    const { email} = values;
    if (validateEmail(email)) {
     a
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            setMessage("Check your email for further instructions");
          })
          .catch((error) => {
            setError(error.message);
            // ..
          });
      
    } else {
      setError('Enter valid email');
    }
  }
  return (
    <Layout>
      <View style={tw`max-w-[800px] w-full justify-center items-center`}>
        <Text style={tw`text-4xl font-extrabold mb-2 text-[#0B3270]`}className="text-4xl font-extrabold mb-5 text-[#0B3270]">Reset Password</Text>
        <Text style={tw`text-red-600 text-xl ${error?'flex':'hidden'}`}>{error?error:""}</Text>
        <Text style={tw`text-yellow-400 text-xl ${message?'flex':'hidden'}`}>{message?message:""}</Text>
        <TextBox
          placeholder="Email Address"
          onChangeText={(text) => handleChange(text, 'email')}
        />
        <View style={tw`flex-row justify-around items-center flex-wrap w-[92%]`}>
          <Btn onClick={() => Login()} title="Submit" style={{ width: '48%' }} />
          <Btn
            onClick={() => navigation.navigate('Signup')}
            title="Sign Up"
            style={{ width: '48%', backgroundColor: '#344869' }}
          />
           <Btn
            onClick={() => navigation.replace('Login')}
            title="Login"
            style={{ width: '48%', backgroundColor: '#344869' }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default ResetScreen;
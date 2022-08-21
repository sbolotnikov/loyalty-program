import { View, Text, Button, Dimensions } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import validateEmail from '../util/functions';
import tw from 'twrnc';


const LoginScreen = () => {

  const { login, signInWithGoogle } = useAuth();
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const [values, setValues] = useState({
    email: '',
    pwd: '',
  });

  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
    
  }

  async function submitCredentials(e) {
    const { email, pwd } = values;
    e.preventDefault();
    if (validateEmail(email)) {
      if (pwd.length < 6) setError('Password should be at least 6 characters');
      else {
        try {
          setError('');
          // setLoading(true);
          await login(email, pwd);
        } catch(err) {
          console.log(err)
          setError('Failed to log in');
        }
    
        // setLoading(false);
      }
    } else {
      setError('Enter valid email');
    }
  }
  return (
    <KeyboardAwareScrollView>
    <Layout>
      <View style={tw`max-w-[800px] w-full h-[85%] justify-center items-center`}>
        <Text style={tw`text-4xl font-extrabold mb-2 text-[#3D1152]`}>Login</Text>
        <Text style={tw`font-bold text-base text-justify m-2 text-black`}>Joining Fred Astaire Rewards means unlocking access to exclusive benefits and gifts.</Text>   
        {error &&<Text style={tw`text-red-600 text-xl ${error?'flex':'hidden'}`}>{error?error:""}</Text>}
        {message &&<Text style={tw`text-yellow-400 text-xl ${message?'flex':'hidden'}`}>{message?message:""}</Text>}
        
        <TextBox
          placeholder="Email Address"
          onChangeText={(text) => handleChange(text, 'email')}
        />
        <TextBox
          placeholder="Password"
          onChangeText={(text) => handleChange(text, 'pwd')}
          secureTextEntry={true}
        />
        <View style={tw`flex-row justify-around items-center flex-wrap w-[92%]`}>
          <Btn onClick={(e)=>submitCredentials(e)} title="Login" style={{ width: '48%', backgroundColor: '#3D1152' }} />
          <Btn
            onClick={() => navigation.navigate('Signup')}
            title="Sign Up"
            style={{ width: '48%', backgroundColor: '#344869' }}
          />
          <View style={tw`w-[48%] ios:hidden `}>
          <Btn
            onClick={signInWithGoogle}
            title="Google"
            style={{ width: '100%', backgroundColor: '#3D1152' }}
          /></View>
          <Btn
            onClick={() => navigation.navigate('Resetpass')}
            title="Forgot Password"
            style={{ width: '48%', backgroundColor: '#344869' }}
          />
         
        </View>
      </View>
     </Layout>
     </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
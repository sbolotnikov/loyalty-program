import { View, Text, Button, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import validateEmail from '../util/functions';

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
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

  function login() {
    const { email, pwd } = values;
    if (validateEmail(email)) {
      if (pwd.length < 6) setError('Password should be at least 6 characters');
      else {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, pwd)
          .then(() => {})
          .catch((error) => {
            setError(error.message);
            // ..
          });
      }
    } else {
      setError('Enter valid email');
    }
  }
  return (
    <Layout>
      <View className="max-w-[800px] w-full justify-center items-center">
        <Text className="text-4xl font-extrabold mb-5">Login</Text>
        <Text className="text-red-600 text-xl">{error?error:""}</Text>
        <Text className="text-yellow-400 text-xl">{message?message:""}</Text>

        <TextBox
          placeholder="Email Address"
          onChangeText={(text) => handleChange(text, 'email')}
        />
        <TextBox
          placeholder="Password"
          onChangeText={(text) => handleChange(text, 'pwd')}
          secureTextEntry={true}
        />
        <View className="flex-row justify-around items-center flex-wrap w-[92%]">
          <Btn onClick={() => login()} title="Login" style={{ width: '48%' }} />
          <Btn
            onClick={() => navigation.navigate('Signup')}
            title="Sign Up"
            style={{ width: '48%', backgroundColor: '#344869' }}
          />
          <Btn
            onClick={() => signInWithGoogle}
            title="Google"
            style={{ width: '48%' }}
          />
          <Btn
            onClick={() => navigation.navigate('Resetpass')}
            title="Forgot Password"
            style={{ width: '48%', backgroundColor: '#344869' }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default LoginScreen;

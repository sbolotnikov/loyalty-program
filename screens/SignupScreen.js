import { View, Text, Button, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import validateEmail from '../util/functions';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    email: '',
    pwd: '',
    pwd2: '',
  });

  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  function SignUp() {
    const { email, pwd, pwd2 } = values;
    if (validateEmail(email)) {
      if (pwd.length < 6) setError('Password should be at least 6 characters');
      else if (pwd == pwd2) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, pwd)
          .then(() => {
            navigation.replace('Login');
          })
          .catch((error) => {
            setError(error.message);
            // ..
          });
      } else {
        setError('Passwords are different!');
      }
    } else {
      setError('Enter valid email');
    }
  }
  return (
    <Layout>
      <View className="max-w-[800px] w-full justify-center items-center">
        <Text className="text-4xl font-extrabold mb-5">Sign In</Text>
        <Text className="text-red-600 text-xl">{error?error:""}</Text>
        <Text className="text-yellow-400 text-xl">{message?message:""}</Text>
        <TextBox
          placeholder="Email Address"
          onChangeText={(text) => handleChange(text, 'email')}
        />
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '92%',
          }}
        >
          <Btn
            onClick={() => SignUp()}
            title="Sign Up"
            style={{ width: '48%' }}
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

export default SignupScreen;

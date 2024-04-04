import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import validateEmail from '../util/functions';
import tw from 'twrnc';
import useDimensions from '../hooks/useDimensions';
const SignupScreen = () => {

  const navigation = useNavigation();
  const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { signup } = useAuth();
  const [values, setValues] = useState({
    email: '',
    pwd: '',
    pwd2: '',
  });

  const { dimensions } =useDimensions();
  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  async function submitSignup(e) {
    e.preventDefault();
    const { email, pwd, pwd2 } = values;
    if (validateEmail(email)) {
      if (pwd.length < 6) setError('Password should be at least 6 characters');
      else if (pwd == pwd2) {
        try {
          setError('');
          // setLoading(true);
          await signup(email, pwd);
        } catch (err) {
          console.log(err);
          setError('Failed to create an account');
        }

        // setLoading(false);
      } else {
        setError('Passwords are different!');
      }
    } else {
      setError('Enter valid email');
    }
  }
  return (
    <KeyboardAwareScrollView>
      <Layout>
        <View style={tw`max-w-[800px] w-full justify-center items-center`}>
          <Text style={tw`text-4xl font-extrabold mb-2 text-[#3D1152]`}>
            Sign Up
          </Text>
          <Text style={tw`text-red-600 text-xl ${error ? 'flex' : 'hidden'}`}>
            {error ? error : ''}
          </Text>
          <Text
            style={tw`text-yellow-400 text-xl ${message ? 'flex' : 'hidden'}`}
          >
            {message ? message : ''}
          </Text>
          
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
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => handleChange(text, 'pwd2')}
          />
          <View
            style={tw`flex-row justify-around items-center flex-wrap w-[92%]`}
          >
            <Btn
              onClick={(e) => submitSignup(e)}
              title="Sign Up"
              style={{ width: '48%', backgroundColor: '#3D1152' }}
            />
            <Btn
              onClick={() => navigation.replace('Login')}
              title="Login"
              style={{ width: '48%', backgroundColor: '#344869' }}
            />
          </View>
        </View>
      </Layout>
    </KeyboardAwareScrollView>
  );
};

export default SignupScreen;

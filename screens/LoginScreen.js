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
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const screen = Dimensions.get('screen');
    const [dimensions, setDimensions] = useState({ screen });
  
    useEffect(() => {
      const subscription = Dimensions.addEventListener('change', ({ screen }) => {
        setDimensions({ screen });
      });
      return () => subscription?.remove();
    });
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
        <SelectDropdown
                    dropdownBackgroundColor={'white'}
                    data={['FADS  Syracouse', 'another Studio']}
                    defaultValue={""}
                    onSelect={(selectedItem, index) => {
                      console.log(
                        selectedItem, index
                      );
                     
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      //   console.log(selectedItem, index);
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                    buttonStyle={{
                      width: (dimensions.screen.width<800)?dimensions.screen.width*.92: 800*.92,
                      height: 40,
                      backgroundColor: '#FFF',
                      borderRadius: 999,
                      borderWidth: 2,
                      borderColor: '#C9AB78',
                      justifyContent: 'center',
                      alignItems:'center',
                      position: 'relative',
                    }}
                    buttonTextStyle={{ color: '#444', textAlign: 'center' }}
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <FontAwesome
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          color={'#C9AB78'}
                          size={18}
                          style={tw`absolute right-2 top-2`}
                        />
                      );
                    }}
                    dropdownStyle={{
                      backgroundColor: '#EFEFEF',
                      borderRadius: 8,
                      borderWidth: 1,
                      width: (dimensions.screen.width<800)?dimensions.screen.width*.92: 800*.92,
                      height:300,
                      borderColor: '#C9AB78',
                    }}
                    rowStyle={{
                      backgroundColor: '#EFEFEF',
                      height: 35,
                      borderBottomColor: '#C5C5C5',
                    }}
                    rowTextStyle={{
                      color: '#444',
                      textAlign: 'center',
                      margin: 'auto',
                      textSize: 18,
                    }}
                  />
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
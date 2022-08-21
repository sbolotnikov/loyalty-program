import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import validateEmail from '../util/functions';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { collection, where, query, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
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
    studio:''
  });
  const [value, loading, error2] = useCollection(collection(db, 'studios'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  console.log(value)
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
          {value &&<SelectDropdown
                    dropdownBackgroundColor={'white'}
                    data={value.docs.map((doc) => (doc.data().name))}
                    defaultValue={""}
                    onSelect={(selectedItem, index) => {
                      handleChange(value.docs[index].id, 'studio')
                      console.log(
                        selectedItem, index, value.docs[index].id
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
                  />}
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

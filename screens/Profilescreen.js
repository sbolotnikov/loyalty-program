import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import tw from 'twrnc';
import useAuth from '../hooks/useAuth';
// import {GlobalContext} from '../globalContext';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import { pickImage, deleteOldImage } from '../util/functions';
const Profilescreen = () => {
  const { currentUser, logout, updatePass, updateUser, updatePhone } = useAuth();
  // const {loading, setLoading} = useContext(GlobalContext);
  const [error, setError] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [updateLocal, setUpdateLocal] = useState(false);
  const [visEdit, setVisEdit] = useState(false);
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    pwd: '',
    pwd2: '',
    phone: currentUser.phone ? currentUser.phone : '',
    name: currentUser.displayName ? currentUser.displayName : 'Guest',
    image: currentUser.photoURL,
  });
console.log(currentUser)
  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }
  const pickAvatar = async (e) => {
    // No permissions request is necessary for launching the image library
    e.preventDefault();
    let picURL = await pickImage('images', '', 300);
    console.log(picURL);
    handleChange(picURL, 'image');
  };
  let err1=""
  const submitReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const { pwd, pwd2, name, image, phone } = values;
    
    if (pwd.length >= 6) {
      if (pwd == pwd2) {

        try {
          setError('');
          setLoadingLocal(true);
          setUpdateLocal(true);
          await updatePass(pwd);
        } catch (err) {
          console.log(err.message);
          setError(`Failed to update password. ${err.message}`);
          err1=err.message;
        }
       
      } else {
        setError('Passwords are different!');
        err1="Passwoards are different!";
      }
    } else {
      if (pwd > '') {
        setError('Password should be at least 6 characters');
        err1="Password should be at least 6 characters";
      }
    }
    if (
      (name !== currentUser.displayName || image !== currentUser.photoURL) &&
      err1 == ''
    ) {
      // finding name of the old profile image and if it is in db it will be replaced
      let userOldPicture = currentUser.photoURL;
      console.log(userOldPicture);
      try {
        setLoadingLocal(true);
        setUpdateLocal(true);
        await updateUser(name, image);
      } catch (err) {
        console.log(err);
        err1=err.message;
        setError(`Failed to update profile. ${err.message}`);
      }
    }
    if ((image !== currentUser.photoURL)&&(err1=="")) deleteOldImage('images', currentUser.photoURL);
    if ((err1 == '')&&(phone !== currentUser.phone)&&(phone.length==10)) {
      try {
        setLoadingLocal(true);
        setUpdateLocal(true);
        await updatePhone(phone);
      } catch (err) {
        console.log(err);
        err1=err.message;
        setError(`Failed to update phone. ${err.message}`);
      }
    } else if (err1 === "") {
      setError("Phone number should be 10 digits");
      err1="10 digits"
    }
    setUpdateLocal(false);
  };
  useEffect(() => {
    if (updateLocal == false && loadingLocal == true && err1 == '') {
      setMessage(
        'Profile updated successfully. To set changes please re-log in.'
      );
      setLoadingLocal(false);
      console.log('Profile updated successfully');
    }
  }, [updateLocal]);
  return (
    <Layout>
      <View style={tw`w-full h-full justify-center items-center`}>
      <Text style={tw`text-2xl text-center font-extrabold mb-2 text-[#3D1152]`}>
           {((currentUser.substudio!==undefined)&&(currentUser.substudio!==""))?"Area "+currentUser.area:"Studio:"+currentUser.area}
        </Text>
        <Text style={tw`text-2xl text-center font-semibold mb-2 text-[#3D1152]`}>
           {currentUser.status} profile{((currentUser.substudio!==undefined)&&(currentUser.substudio!==""))?" of "+currentUser.substudio:""}
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
                  style={tw`text-2xl font-extrabold mb-2 text-black`}
                  onPress={() => setVisEdit(true)}
                >
                  {values.name}
                </Text>
              )}
              <Text style={tw`font-bold text-xl`}>{currentUser.email}</Text>
            </View>
            <TouchableOpacity onPress={(e) => pickAvatar(e)}>
              <Image
                source={values.image}
                style={tw`h-20 w-20 bg-gray-300 p-4 rounded-full`}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={tw`text-red-600 text-xl text-center ${
              error ? 'flex' : 'hidden'
            }`}
          >
            {error ? error : ''}
          </Text>
          <Text
            style={tw`text-yellow-400 text-xl text-center ${
              message ? 'flex' : 'hidden'
            }`}
          >
            {message ? message : ''}
          </Text>

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
          <Text
              style={[tw`font-extrabold text-2xl text-center mt-3 text-[#3D1152]`]}
            >
              Telephone:
              </Text>
              <TextBox 
                placeholder="Enter Telephone number"
                value={values.phone}
                onChangeText={(tel) => {
                  console.log(tel)
                  if (tel.length>values.phone.length){
                    if (tel.length>10) return;
                    if (parseInt(tel).toString()==tel) handleChange(tel, 'phone');

                  }else handleChange(tel, 'phone');
                }}
              />
           
          <View
            style={tw`flex-row justify-around items-center flex-wrap w-[92%]`}
          >
            <Btn
              onClick={(e) => submitReset(e)}
              title="Save changes"
              style={{
                width: '48%',
                backgroundColor: '#3D1152',
                display: !loadingLocal ? 'flex' : 'none',
              }}
            />
            <Btn
              onClick={() => logout()}
              title="Log out"
              style={{ width: '48%', backgroundColor: '#344869' }}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Profilescreen;

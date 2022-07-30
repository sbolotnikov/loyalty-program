import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Layout from '../components/layout';
import tw from 'twrnc';
import useAuth from '../hooks/useAuth';
// import {GlobalContext} from '../globalContext';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';
import { storage } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
const Profilescreen = () => {
  const { currentUser, logout, updatePass, updateUser } = useAuth();
  // const {loading, setLoading} = useContext(GlobalContext);
  const [error, setError] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [updateLocal, setUpdateLocal] = useState(false);
  const [visEdit, setVisEdit] = useState(false);
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    pwd: '',
    pwd2: '',
    name: currentUser.displayName ? currentUser.displayName : 'Guest',
    image: currentUser.photoURL,
  });

  const cutPath =
    'https://firebasestorage.googleapis.com/v0/b/fads-loyalty-program.appspot.com/o/images%2F';

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
    setLoadingLocal(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    const manipResult = await manipulateAsync(
      result.uri,
      [{ resize: { width: 300 } }],
      { format: 'png' }
    );
    const storageRef = ref(storage, `images/${uuidv4() + '.png'}`);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', manipResult.uri, true);
      xhr.send(null);
    });
    const metadata = {
      contentType: 'image/png',
    };
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url.split('?')[0]);
        handleChange(url, 'image');
      });
    });
    setLoadingLocal(false);
  };
  const submitReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const { pwd, pwd2, name, image } = values;
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
        }
      } else {
        setError('Passwords are different!');
      }
    } else {
      if (pwd > '') setError('Password should be at least 6 characters');
    }
    if (
      (name !== currentUser.displayName || image !== currentUser.photoURL) &&
      error == ''
    ) {
      // finding name of the old profile image and if it is in db it will be replaced
      let userOldPicture = currentUser.photoURL;
      console.log(userOldPicture);
      let path1 = userOldPicture.replaceAll(cutPath, '');
      image !== userOldPicture && path1.length !== userOldPicture.length
        ? (path1 = path1.split('?')[0])
        : (path1 = '');
      try {
        setLoadingLocal(true);
        setUpdateLocal(true);
        await updateUser(name, image);
      } catch (err) {
        console.log(err);
        setError(`Failed to update profile. ${err.message}`);
      }
      if (path1 !== '') {
        const desertRef = ref(storage, "images/"+path1);

        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
            console.log('delete storage file');
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error.message);
          });
      }
    }
    setUpdateLocal(false);
  };
  useEffect(() => {
    if (updateLocal == false && loadingLocal == true && error == '') {
      setMessage(
        'Profile updated successfully. To set changes please re-log in.'
      );
      setLoadingLocal(false);
      console.log('Profile updated successfully');
    }
  }, [updateLocal]);
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
          placeholder="Confirme Password"
          secureTextEntry={true}
          onChangeText={(text) => handleChange(text, 'pwd2')}
        />
        <View
          style={tw`flex-row justify-around items-center flex-wrap w-[92%]`}
        >
          <Btn
            onClick={(e) => submitReset(e)}
            title="Save changes"
            style={{
              width: '48%',
              backgroundColor: '#0B3270',
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
    </Layout>
  );
};

export default Profilescreen;

import { View, Text } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
 export default function  validateEmail(email){

     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      {
        return (true)
      }
        return (false)
    }
 export const pickImage = async (folder) => {
      // No permissions request is necessary for launching the image library
      console.log("in function");

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
      const storageRef = ref(storage, `${folder}/${uuidv4() + '.png'}`);
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
      const snapshot=await uploadBytes(storageRef, blob)
      return await getDownloadURL(snapshot.ref)
    };


    export const deleteOldImage = async (folder,image) => {
      const cutPath =
      `https://firebasestorage.googleapis.com/v0/b/fads-loyalty-program.appspot.com/o/${folder}%2F`;
      let path1 = image.replaceAll(cutPath, '');
      image.length !== path1.length ? (path1 = path1.split('?')[0]) : (path1 = '');
      if (path1 !== '') {
        const desertRef = ref(storage, folder+'/' + path1);

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
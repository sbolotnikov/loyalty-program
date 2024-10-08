
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebase';
import { doc, collection, getDocs, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
 export const pickImage = async (folder, name, width) => {
      // No permissions request is necessary for launching the image library
      console.log("in function");

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      const manipResult = await manipulateAsync(
        result.uri,
        [{ resize: { width: width } }],
        { format: 'jpeg' }
      );
      const storageRef = ref(storage, `${folder}/${(name)?name+uuidv4() + '.jpg':uuidv4() + '.jpg'}`);
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
        contentType: 'image/jpeg',
      };
      const snapshot=await uploadBytes(storageRef, blob)
      return await getDownloadURL(snapshot.ref)
    };
    // export const pickImageLocal = async () => {
    //   // No permissions request is necessary for launching the image library
    //   console.log("in function");

    //   let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     quality: 1,
    //   });
    //   return await manipulateAsync(
    //     result.uri,
    //     [{ resize: { width: 300 } }],
    //     { format: 'png' }
    //   );
    //   }
    export const getUserTotals = async (uid) => {
      const querySnapshot = await getDocs(
        collection(doc(db, 'users', uid), 'rewards')
      );
      let arr=[];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      let localSum = 0;
      for (let i = 0; i < arr.length; i++) {
        localSum += arr[i].points;
      }
      console.log(localSum)
      return localSum
    }
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

// String functions

    export const getPositionOfSubstring = (array, string) =>{
      let i=0;
      // let subString=array[i].split(' ')[0]
      while ((string.indexOf(array[i].split(' ')[0])<0)&&(i<array.length)){
        i++
           
      }
      return string.indexOf(array[i].split(' ')[0])
    }
    export const getStudioFullName = (array, string) =>{
      let i=0;
      while ((i<array.length)&&(string.indexOf(array[i].split(' ')[0])<0)){
        i++
           
      }
      return (i<array.length)?array[i]:""
    }

    export const reverseColor = (str) =>{
      console.log(str)
      let n=parseInt(str.slice(1), 16);
      console.log(n)
      let retString="#"
      let rev = 0;
   
        // traversing bits of 'n' 
        // from the right
        while (n > 0) 
        {
            // bitwise left shift 
            // 'rev' by 1
            rev <<= 1;
   
            // if current bit is '1'
            if ((n & 1) == 1)
                rev ^= 1;
   
            // bitwise right shift 
            //'n' by 1
            n >>= 1;
        }
        return "#"+rev.toString(16)
    }
    
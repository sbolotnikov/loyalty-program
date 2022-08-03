import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import tw from 'twrnc';
import TextBox from './TextBox';
import Btn from './Btn';
import {pickImage, deleteOldImage} from '../util/functions';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc,deleteDoc, Timestamp } from 'firebase/firestore';
import AlertModal from './AlertModal';
const EnterActivity = ({name, desc, price,image, uid, onReturn}) => {
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  // const [loadingLocal, setLoadingLocal] = useState(false);
  // const [updateLocal, setUpdateLocal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    name: name,
    desc: desc,
    price: price,
    image: image,
  });
  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }
  const onPressPicture=async (e)=>{
    e.preventDefault();
    let picURL=await pickImage("active") 
    console.log(picURL)
    handleChange(picURL, 'image')
  }
 

 const submitActivity = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    let errStatus=false;
    const { name, desc, price, image } = values;
    if (name.length >= 5) {
      if (desc.length >= 5) {
        if (price > 0) {
          try {
            setError('');
            let timeStamp=(uid.length>0)?{"updated": Timestamp.now()}:{"created": Timestamp.now()}
            const docRef = doc(db, 'activities', uid.length>0?uid:uuidv4());
            setDoc(
              docRef,
              {
                ...values,
                ...timeStamp,
                bywhom: currentUser.displayName,
              },
              { merge: true }
            );
          } catch (err) {
            console.log(err.message);
            setError(`Failed to update Activity. ${err.message}`);
            errStatus=true;
          }
        } else {
          setError('Price should be more then 0');
          errStatus=true;
        }
      } else {
        setError('Description should be at least 5 characters');
        errStatus=true;
      }
    } else {
      setError('Activity name should be at least 5 characters');
      errStatus=true;
    }
    if (values.image !== image && error == '') {
      // finding name of the old profile image and if it is in db it will be replaced
      deleteOldImage('active',image);
      
    }
    if (!errStatus) onReturn() 
  };

  const deleteSubmition = async (e)=>{
    e.preventDefault();  
    if (uid!==""){
      setModalVisible(true);
    }else onReturn();
  }

 const onConfirmFunction=async (ret)=>{
  setModalVisible(false); 
  if (ret=='Confirm'){
    await deleteDoc(doc(db, "activities", uid));
    deleteOldImage('active',image);
    onReturn();
  }
 }
 
  return (
    <View style={tw`max-w-[800px] w-full justify-center items-center`}>
    {/* <View style={tw` bg-black`}> */}
    <AlertModal title={'Are you sure you want to delete'} button1={'Confirm'} button2={"Cancel"} vis={modalVisible} onReturn={(ret)=>onConfirmFunction(ret)}/>
    {/* </View> */}
          <Text style={tw`text-4xl font-extrabold mb-2 text-[#0B3270]`}>
            {uid!==""?'Edit Existed':'Enter New'} Activity
          </Text>
          <Text style={tw`text-red-600 text-xl ${error ? 'flex' : 'hidden'}`}>
            {error ? error : ''}
          </Text>
          <Text
            style={tw`text-yellow-400 text-xl ${message ? 'flex' : 'hidden'}`}
          >
            {message ? message : ''}
          </Text>
          <TouchableOpacity style={tw`w-[92%] h-52 `} onPress={(e)=>onPressPicture(e)}>
          {values.image>""?<View
              style={[
                tw` h-full w-full rounded-md`,
                {
                  objectFit: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${values.image})`,
                },
              ]}
            />:
            <View style={ tw` h-full w-full justify-center items-center`}>
              <Text>
                Please click to choose image
              </Text>
            </View>
          }
          </TouchableOpacity>
          <TextBox
            placeholder="Activity Name"
            defaultValue={name}
            onChangeText={(text) => handleChange(text, 'name')}
          />
          <TextBox
            placeholder="Description"
            defaultValue={desc}
            onChangeText={(text) => handleChange(text, 'desc')}
          />
          <TextBox
            placeholder="Price"
            defaultValue={price}
            onChangeText={(text) => handleChange(parseFloat(text), 'price')}
            keyboardType="numeric"
          />
          <View
            style={tw`flex-row justify-around items-center flex-wrap w-[92%]`}
          >
           {!((name==values.name)&&(desc==values.desc)&&(price==values.price)&&(image==values.image)) && <Btn
              onClick={(e) => submitActivity(e)}
              title="Submit"
              style={{ width: '48%', backgroundColor: '#0B3270' }}
            />}
            <Btn
              onClick={() => onReturn()}
              title="Cancel"
              style={{ width: '48%', backgroundColor: '#344869' }}
            />
            <Btn
              onClick={(e) => deleteSubmition(e)}
              title="Delete"
              style={{ width: '48%', backgroundColor: '#344869' }}
            />
          </View>
        </View>

  )
}

export default EnterActivity
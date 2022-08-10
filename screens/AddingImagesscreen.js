import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { db } from '../firebase';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import Layout from '../components/layout';
import { deleteOldImage, pickImage, } from '../util/functions';
import CountBox from '../components/CountBox';
import TextBox from '../components/TextBox';
import Btn from '../components/Btn';

const AddingImagesScreen = () => {
  //   https://firebasestorage.googleapis.com/v0/b/fads-loyalty-program.appspot.com/o/additional%2Fcalendar.png?alt=media&token=3d65802b-dcf9-4dc9-a0a8-e1e4fde7a2ca
  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }
  const [snapshot, loading, err] = useCollection(collection(db, 'settings'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [error, setError] = useState('');
  const [editable, setEditable] = useState(false);
  const [textBoxInput, setTextBoxInput] = useState('');
  const [values, setValues] = useState({
    calendar: '',
    carousel: [{ url: '', text: '' }],
  });
  const [imageNumber, setImageNumber] = useState(0);
  useEffect( () => {
    if (snapshot) {
      setValues(snapshot.docs.map((doc) => doc.data())[0]);
      console.log(snapshot.docs[0].id);
      }
  }, [snapshot]);
  useEffect( () => {
    if (err) {
      setError(err);
      }
  }, [err]);  

  const onPressPicture = async (e) => {
    e.preventDefault();
    let picURL = await pickImage('additional', 'calendar', 800);
    // let picURL=pickImageLocal();
    console.log(picURL);
    handleChange(picURL, 'calendar');
  };
  const onPressPictureCarousel = async (e) => {
    e.preventDefault();
    let picURL = await pickImage('additional', '', 600);
    // let picURL=pickImageLocal();
    console.log(picURL);
    let arrCopy = values.carousel;
    arrCopy[imageNumber].url = picURL;
    setValues({ calendar: values.calendar, carousel: arrCopy });
  };
  
 const submitActivity = async (e) => {
  e.preventDefault();
  
        try {
          // setError('');
          let timeStamp={"updated": Timestamp.now()}
          const docRef = doc(db, "settings", snapshot.docs[0].id);
          setDoc(
            docRef,
            {
              ...values,
              ...timeStamp,
            },
            { merge: true }
          );
        } catch (err) {
          console.log(err.message);
          setError(`Failed to update images. ${err.message}`);
          errStatus=true;
        }

};

  return (
    <Layout>
      <View style={tw`max-w-[800px] w-full h-full  items-center`}>
        {/* <AlertModal title={'Are you sure you want to delete'} button1={'Confirm'} button2={"Cancel"} vis={modalVisible} onReturn={(ret)=>onConfirmFunction(ret)}/> */}
        <View
          style={tw`flex-row justify-between items-center flex-wrap w-full mt-3`}
        >
        <Text style={tw`text-2xl font-extrabold mt-1 ml-1 w-[65%] text-[#0B3270]`}>
          {'Calendar'}
        </Text> 
        <Btn
              onClick={(e) => submitActivity(e)}
              title="Save All"
              style={{ width: '31%', backgroundColor: '#0B3270', marginTop:'4px', marginRight:'4px' }}
            />
            </View>
        {!!error && <Text style={tw`text-red-600 text-xl ${error ? 'flex' : 'hidden'}`}>
          {error}
        </Text>}
        <TouchableOpacity
          style={tw`w-[92%] h-48 my-1`}
          onPress={(e) => onPressPicture(e)}
        >
          {values.calendar > '' ? (
            <ImageBackground source={{ uri: values.calendar }} resizeMode="contain" style={[
                tw` h-full w-full`,
                {
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                },
              ]}
              />

          ) : (
            <View style={tw` h-full w-full justify-center items-center`}>
              <Text>Please click to choose image</Text>
            </View>
          )}
        </TouchableOpacity>
        <View
          style={tw`flex-row justify-between items-center flex-wrap w-full `}
        >
        <Text style={tw`text-xl font-bold mt-1 ml-1 w-[60%] text-[#0B3270]`}>
          {'Front page Images'}
        </Text>
        <View style={tw`w-[37%] mr-1 flex-row justify-end`}>
        <CountBox
          startValue={imageNumber}
          setWidth={4}
          onChange={(num) => {
            if (num>=values.carousel.length) {
              setEditable(false)
              let arrCopy = values.carousel;
              arrCopy.push({text:'', url:""});
              setValues({ calendar: values.calendar, carousel: arrCopy });
              setEditable(true)
              setImageNumber(arrCopy.length-1)
            }else setImageNumber(num);
            
          }}
        />
        <TouchableOpacity style={tw`rounded-full bg-red-700 ml-1`} onPress={(e)=>{
           let arrCopy = values.carousel;
             if (arrCopy.length>1){

             if (arrCopy[imageNumber].url) deleteOldImage('additional', arrCopy[imageNumber].url);
    

              arrCopy.splice(imageNumber, 1);
              console.log(imageNumber, arrCopy)
              if (imageNumber==values.carousel.length) setImageNumber(arrCopy.length-1)
              setValues({ calendar: values.calendar, carousel: arrCopy });
              setEditable(false)
             }
        }}>
          <Text style={tw`font-semibold text-white text-xl px-3 mb-1`}>x</Text>
        </TouchableOpacity>
        </View>
        </View>
        {!!editable?
        <TextBox
            defaultValue={values.carousel[imageNumber].text}

            onSubmitEditing={(e) =>{ 
              console.log(e.target.value, "inside endEditing");
              let arrCopy = values.carousel;
              arrCopy[imageNumber].text = e.target.value;
              setValues({ calendar: values.calendar, carousel: arrCopy });
              setEditable(false)
              }}
          />:
          <TouchableOpacity
          style={tw`w-[92%] my-1`}
          onPress={(e) =>setEditable(true)}><Text>{values.carousel[imageNumber].text}</Text></TouchableOpacity>}
        <TouchableOpacity
          style={tw`w-[92%] h-48 my-1`}
          onPress={(e) => onPressPictureCarousel(e)}
        >
          {values.carousel[imageNumber].url > '' ? (
            <ImageBackground source={{ uri: values.carousel[imageNumber].url }} resizeMode="contain" style={[
                tw` h-full w-full`,
                {
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                },
              ]}
              />
          ) : (
            <View style={tw` h-full w-full justify-center items-center`}>
              <Text>Please click to choose image</Text>
            </View>
          )}         
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default AddingImagesScreen;

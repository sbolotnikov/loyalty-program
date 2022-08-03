import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Platform, Dimensions, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import moment from 'moment';
import Layout from '../components/layout';
import tw from 'twrnc';
import CountBox from '../components/CountBox';
const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [summed, setSum] = useState(0);
  const [activities, setActivities] = useState([]);
  const [decodeMode, setDecodeMode] = useState(false);
  const [text, setText] = useState(
    '{"a":["gGazOy0FUtZ2ekZ1rQ2JyGKEsNc2","1659506937"],"b":["16108765-e6f2-47f6-8eca-c790b0132337","22ba6ee6-383b-4321-a7e8-439ee7a4687d","58da4db0-fdaa-4207-86e8-cf5775391529","7eae2cda-1517-4fcd-b0ed-69079a868647","a5049afe-77e1-4642-81d2-a5f90161b01f","b7eac39d-aa6d-42ae-9f63-3e4ab9d9efeb"],"c":[1,1,1,1,1,1]}'
  );
  const screen = Dimensions.get('screen');
  const [dimensions, setDimensions] = useState({ screen });
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setDimensions({ screen });
    });
    return () => subscription?.remove();
  });
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    if (Platform.OS !== 'web') askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data);
  };

  // Check permissions and return the screens

  if (Platform.OS !== 'web') {
    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
        </View>
      );
    }
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>No access to camera</Text>
          <Button
            title={'Allow Camera'}
            onPress={() => askForCameraPermission()}
          />
        </View>
      );
    }
  }
  // Return the View
  useEffect(async () => {
    if (text !== '') {
      let obj = JSON.parse(text);
      console.log(obj.a[1]);
      var date = new Date(null);
      date.setSeconds(obj.a[1]);
      console.log(moment(date).format('MMM DD YYYY, hh:mm'));
      console.log(obj.a[0])
      let recArr = [];
      let sums=0
      for (let i = 0; i < obj.b.length; i++) {
        const docRef = doc(db, 'activities', obj.b[i]);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          let rec = {
            name: docSnap.data().name,
            image: docSnap.data().image,
            price: docSnap.data().price,
            amount: obj.c[i],
            uid:obj.b[i]
          };
          sums+=docSnap.data().price*obj.c[i]
          recArr.push(rec);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      }

      setActivities([...recArr])
      setSum(sums)
    }
  }, [text]);
  useEffect(() => {
    let localSum=0;
    for (let i = 0; i < activities.length; i++) {
       localSum+=activities[i].amount*activities[i].price
    }
    setSum(localSum);
  }, [activities]);
  return (
    <Layout>
      {!decodeMode ? (
        <View style={styles.container}>
          <View style={styles.barcodebox}>
            {(Platform.OS === 'ios' || Platform.OS === 'android') && (
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }}
              />
            )}
            {Platform.OS === 'web' && (
              <BarcodeScannerComponent
                width={300}
                height={300}
                onUpdate={(err, result) => {
                  if (result) {
                    setScanned(true);
                    setText(result.text);
                  }
                  console.log(err);
                }}
              />
            )}
          </View>
          {text && (
            <Button
              title={'Decode text'}
              onPress={() => setDecodeMode(true)}
              color="#344869"
            />
          )}
          {scanned && (
            <Button
              title={'Scan again?'}
              onPress={() => setScanned(false)}
              color="tomato"
            />
          )}
        </View>
      ) : (
        <View style={tw``}>
        {activities.map((doc, i)=>(
              <View key={doc.uid}
              style={tw`flex-row justify-between w-[95%] items-center mx-auto my-2`}>
              <View style={tw`w-[65%] flex-row`}>
               <Image
              source={doc.image}
              style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
             />
               <Text style={tw`ml-2`}>{doc.name}</Text>
              </View> 
              <View style={tw`w-[35%] ${dimensions.screen.width>576?'flex-row':''} justify-between`}>
               <CountBox startValue={doc.amount} setWidth={2} onChange={(num)=>{
                  // let activity={name:doc.name, price:doc.price, image:doc.image, uid:doc.uid, amount:num}
                  let arrCopy=activities;
                  arrCopy[i].amount=num;
                  setActivities([...arrCopy]);  
                  }}/>
                  <Text style={tw`text-center`}> x {doc.price} = {doc.price*doc.amount}</Text>
              </View>    
             </View>))
             }
             <Text>Total{summed}</Text>
        </View>
      )}
    </Layout>
  );
};
export default ScanScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
});

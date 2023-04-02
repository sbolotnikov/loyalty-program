import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Platform,  Image,} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { doc, collection, addDoc, getDoc, Timestamp, getDocs, query, where, documentId,} from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/layout';
import tw from 'twrnc';
import CountBox from '../components/CountBox';
import AlertModal from '../components/AlertModal';
import Btn from '../components/Btn';
import useAuth from '../hooks/useAuth';
import TextBox from '../components/TextBox';
import { getUserTotals } from '../util/functions';
import useDimensions from '../hooks/useDimensions';
const logo = require('../assets/dancerslogosm.png');
const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [summed, setSum] = useState(0);
  const [noClaim, setNoClaim] = useState(false);
  const [userData, setUserData] = useState({});
  const [userTotals, setUserTotals] = useState(0);
  const [activities, setActivities] = useState([]);
  const [decodeMode, setDecodeMode] = useState(false);
  const { currentUser } = useAuth();
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const { dimensions } =useDimensions();
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
  const indicatorJSON = (text) => {
    try {
      JSON.parse(text);
    } catch (e) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    async function fetchData() {
    if (text !== '') {
      if (!indicatorJSON(text)) {
        setModalVisible2(true);
        setText('');
      } else {
        let obj = JSON.parse(text);
        console.log(obj)
        var date2 = parseInt(Date.now()) / 1000;
        if (date2 - obj.a[1] > 60) {
          setModalVisible2(true);
          setText('');
        } else {
          let recArr = [];
          let sums = 0;

          const querySnapshot = await getDocs(
            query(collection(doc(db, 'studios', currentUser.studio), 'activities'),
              where(documentId(), 'in', obj.b)
            )
          );
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let rec = {
              name: doc.data().name,
              image: doc.data().image,
              price: doc.data().price,
              amount: 0,
              id: '',
              note: '',
            };
            recArr.push(rec);
          });
          console.log(recArr, obj.b)
          for (let i = 0; i < obj.b.length; i++) {
            recArr[i].amount = obj.c[i];
            recArr[i].id = obj.b[i];
            sums += recArr[i].price * obj.c[i];
            if (recArr[i].price < 0 && currentUser.status != 'super') {
              setNoClaim(true);
              console.log('not super enough ');
            }
          }
          const docRef1 = doc(db, 'users', obj.a[0]);
          const docSnap1 = await getDoc(docRef1);
          if (docSnap1.exists()) {
            let userData = {
              name: docSnap1.data().displayName,
              image: docSnap1.data().photoURL,
              uid: obj.a[0],
            };
            setUserTotals(await getUserTotals(obj.a[0]));
            setUserData(userData);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such user');
          }
          setActivities([...recArr]);
          setSum(sums);
        }
      }
    }
  }
  fetchData()
  }, [text]);
  useEffect(() => {
    let localSum = 0;
    for (let i = 0; i < activities.length; i++) {
      localSum += activities[i].amount * activities[i].price;
    }
    setSum(localSum);
  }, [activities]);

  const onConfirmFunction = async (ret) => {
    setModalVisible(false);
    if (!noClaim) {
      if (ret == 'Confirm') {
        console.log('confirmed function called');
        let localRec = {};
        let localSum = 0;
        for (let i = 0; i < activities.length; i++)
          localSum += activities[i].amount * activities[i].price;
        if (localSum + userTotals < 0) {
          setModalVisible3(true);
          // console.log("insufficient funds")
        } else {
          for (let i = 0; i < activities.length; i++) {
            localRec = {
              points: activities[i].amount * activities[i].price,
              amount: activities[i].amount,
              name: activities[i].name,
              cofimedby: currentUser.displayName,
              confirmed: Timestamp.now(),
            };
            await addDoc(
              collection(doc(db, 'users', userData.uid), 'rewards'),
              {
                points: activities[i].amount * activities[i].price,
                amount: activities[i].amount,
                name: activities[i].name,
                note: activities[i].note,
                cofimedby: currentUser.displayName,
                confirmed: Timestamp.now(),
              }
            );
            console.log(localRec);
          }
          setDecodeMode(false);
          setText('');
        }
      }
    }
  };

  return (
    <Layout>
      {!decodeMode ? (
        <View style={styles.container}>
          <Text
            style={tw`font-extrabold text-2xl text-center mt-4 text-[#3D1152]`}
          >
            Scan Now
          </Text>
          <AlertModal
            title={`Your QR code is invalid. Try again!`}
            button1={'Ok'}
            button2={''}
            vis={modalVisible2}
            onReturn={(ret) => setModalVisible2(false)}
          />
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
          <View
            style={tw`flex-row justify-around items-center flex-wrap w-[92%]`}
          >
            {!!text && (
              <Btn
                title={'Decode text'}
                onClick={() => setDecodeMode(true)}
                style={{ width: '48%', backgroundColor: '#3D1152' }}
              />
            )}
            {!!scanned && (
              <Btn
                title={'Scan again?'}
                onClick={() => {
                  setScanned(false);
                  setText('');
                }}
                style={{ width: '48%', backgroundColor: '#344869' }}
              />
            )}
          </View>
        </View>
      ) : (
        <View
          style={[
            tw`w-full h-[80%] justify-center items-center max-w-[800px] `,
          ]}
        >
          <AlertModal
            title={
              noClaim
                ? 'Teachers can only add Activities. Please check with manager about Claiming Rewards'
                : `Are you sure you want to confirm the record of activities of ${userData.name}?`
            }
            button1={'Confirm'}
            button2={'Cancel'}
            vis={modalVisible}
            onReturn={(ret) => onConfirmFunction(ret)}
          />
          <AlertModal
            title={'Insufficient funds'}
            button1={'Confirm'}
            button2={''}
            vis={modalVisible3}
            onReturn={(ret) => setModalVisible3(false)}
          />
          <View style={tw` justify-around items-center flex-wrap w-full mt-4`}>
            <View
              style={tw`flex-row justify-around items-center flex-wrap w-full`}
            >
              <Image
                source={userData.image}
                style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
              />
              <Text style={tw`font-extrabold text-xl text-red-400`}>
                {userData.name}
              </Text>
            </View>
            <View
              style={tw`flex-row justify-around items-center flex-wrap w-full`}
            >
              <Text style={tw`text-red-400 font-extrabold text-right`}>
                Available points:{userTotals}
              </Text>
              <Text style={tw` text-red-400 font-extrabold text-right`}>
                Total to claim: {summed}
              </Text>
            </View>
          </View>
          <View
            style={tw`flex-row justify-around items-center flex-wrap w-[92%]`}
          >
            <Btn
              onClick={(e) => setModalVisible(true)}
              title="Confirm"
              style={{ width: '48%', backgroundColor: '#344869' }}
            />

            <Btn
              onClick={(e) => {
                setDecodeMode(false);
                setText('');
              }}
              title="Cancel"
              style={{ width: '48%', backgroundColor: '#3D1152' }}
            />
          </View>
          <View
            style={[
              tw`w-[98%]  justify-center items-center m-auto bg-gray-500/30 m-1 rounded-lg border border-[#776548] py-5 relative`,
              { overflow: 'scroll' ,  height: dimensions.screen.height*.65  },
            ]}
          >
            <View style={tw`h-auto absolute top-0 left-0`}>
              {activities.map((doc, i) => (
                <View
                  key={doc.id}
                  style={tw`flex-row justify-between w-[95%] items-center mx-auto my-5 h-auto flex-wrap`}
                >
                  <View style={tw`w-[65%] flex-row`}>
                    <Image
                      source={doc.image ? doc.image : logo}
                      style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
                    />
                    <Text style={tw`ml-2`}>{doc.name}</Text>
                  </View>
                  <View
                    style={tw`w-[35%] ${
                      dimensions.screen.width > 576 ? 'flex-row' : ''
                    } justify-between`}
                  >
                    <CountBox
                      startValue={doc.amount}
                      setWidth={2}
                      onChange={(num) => {
                        // let activity={name:doc.name, price:doc.price, image:doc.image, uid:doc.uid, amount:num}
                        let arrCopy = activities;
                        if (num == 0) arrCopy.splice(i, 1);
                        else arrCopy[i].amount = num;
                        setActivities([...arrCopy]);
                      }}
                    />
                    <Text style={tw`text-center`}>
                      {' '}
                      x {doc.price} = {doc.price * doc.amount}
                    </Text>
                  </View>
                  <TextBox
                    placeholder="Activity Note"
                    onChangeText={(text) => {
                      let arrCopy = activities;
                      arrCopy[i].note = text;
                      setActivities([...arrCopy]);
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
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
    justifyContent: 'start',
    position: 'relative',
  },
  barcodebox: {
    marginTop: 100,
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#c9ab78',
  },
});

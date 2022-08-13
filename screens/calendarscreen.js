import { View, ImageBackground, Dimensions, Text} from 'react-native';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { doc, collection} from 'firebase/firestore';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';


// import { PinchGestureHandler, State } from 'react-native-gesture-handler'



import tw from 'twrnc';
const Calendarscreen = () => {
  
  const screen = Dimensions.get('window')
  const [snapshot, loading, err] = useCollection(collection(db, 'settings'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [calendar, setCalendar] = useState("");
  // const [scale, setScale] = useState(new Animated.Value(1));
    useEffect( () => {
    if (snapshot) {
    setCalendar(snapshot.docs.map((doc) => doc.data())[0].calendar);

      }
  }, [snapshot]);


  // onPinchEvent = Animated.event(
  //   [
  //     {
  //       nativeEvent: { scale: scale }
  //     }
  //   ],
  //   {
  //     useNativeDriver: true
  //   }
  // )
  
  // onPinchStateChange = event => {
  //   if (event.nativeEvent.oldState === State.ACTIVE) {
  //     Animated.spring(scale, {
  //       toValue: 1,
  //       useNativeDriver: true
  //     }).start()
  //   }
  // }
  

  return (
    <Layout>   
     <View style={tw` h-[85%] w-full flex-col  justify-start items-center max-w-[800px]`}>
     <Text style={tw`font-bold text-xl text-left mt-4 text-[#0B3270] ml-2 w-full`}>Our Dance Calendar</Text>
     <Text style={tw`font-bold text-base text-justify m-2 text-[#776548]`}>Check out this month’s schedule of Group Classes, Practice Parties and Special Events at our Studio. Come with a dance partner or by yourself. For more information and to join us, just give us a call!</Text>     
            <ImageBackground source={calendar} resizeMode="contain" style={[
                tw` h-[65%] w-full`,
                {
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top',
                },
              ]}
              />
              </View>
{/* 
  <PinchGestureHandler
    onGestureEvent={this.onPinchEvent}
    onHandlerStateChange={this.onPinchStateChange}>
    <Animated.Image
                source={{uri: calendar}}
      style={{
        width: screen.width,
        height: 300,
        transform: [{ scale: scale }]
      }}
      resizeMode='contain'
    />
  </PinchGestureHandler> */}


    </Layout>
  );
};

export default Calendarscreen;


import { View, ImageBackground, Dimensions} from 'react-native';
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
     <View style={tw` h-[85%] w-full flex-col mt-2 justify-start items-center`}>       
            <ImageBackground source={calendar} resizeMode="contain" style={[
                tw` h-full w-full`,
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


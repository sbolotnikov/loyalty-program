import { View, ImageBackground, Dimensions, Text} from 'react-native';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { doc, collection} from 'firebase/firestore';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import useAuth from '../hooks/useAuth';
import tw from 'twrnc';
import useDimensions from '../hooks/useDimensions';
// import { PinchGestureHandler, State } from 'react-native-gesture-handler'



const Calendarscreen = () => {
  const { currentUser } = useAuth();
  const { dimensions } =useDimensions();
  const [snapshot, loading, err] = useCollection(collection(doc(db, 'studios', currentUser.studio), 'settings'), {
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
     <View style={tw` h-[75%] w-full flex-col  justify-start items-center max-w-[800px]`}>
     <Text style={tw`font-bold text-xl text-left mt-4 text-[#3D1152] ml-2 w-full`}>Our Dance Calendar</Text>
     <Text style={tw`font-bold text-base text-justify m-2 text-[#776548]`}>Check out this month’s schedule of Group Classes, Practice Parties and Special Events at our Studio. Come with a dance partner or by yourself. For more information and to join us, just give us a call!</Text>     
            <ImageBackground source={calendar} resizeMode="stretch" style={[
                tw` w-full`,
                {
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top',
                }, ,{ height: dimensions.screen.height*.55  }
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


import { View, Text, ImageBackground, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useFonts } from 'expo-font';
import useDimensions from '../hooks/useDimensions';
import ShowIcon from '../components/svg/showIcon';

// import Swiper from 'react-native-swiper/src';
//   <Swiper  width={width>900?800:Math.round(width*.8)} height={Math.round(height*.6)} loop={true} index={0} showsButtons> 
const logo = require('../assets/dancerslogosm.png');
const Homescreen = () => {
  const { currentUser } = useAuth();
  const studioReady = () => {
    const navigation = useNavigation();
    console.log(currentUser)
    const [summed, setSums] = useState(0);
    const [size1, setSize] = useState(0);
    const [textSize, setTextSize] = useState(0);
    const [carousel, setCarousel] = useState([{ url: '', text: '' }]);
    const [snapshot, loading, err] = useCollection(collection(doc(db, 'studios', currentUser.studio), 'settings'), { snapshotListenOptions: { includeMetadataChanges: true },});
    const [fontLoaded] = useFonts({
    DancingScript: require('../assets/fonts/DancingScriptVariableFont.ttf'),
    });
    const { dimensions } =useDimensions();
    const [icons, setIcons]= useState([{
      title: 'Music Player',
      link: 'Music',
    },
    {
      title: 'About',
      link: 'About',
    },])
  useEffect(() => {
    if (snapshot) {
      let arr1 = snapshot.docs.map((doc) => doc.data())[0].carousel;
      console.log(snapshot.docs[0].id);
      setCarousel(
        arr1.map((item, i) => ({
          ...item,
          id: `image_carousel_${snapshot.docs[0].id + i}`,
        }))
      );
    }
  }, [snapshot]);
  useEffect(async () => {
    let arr = [];
    if (currentUser.status == 'student'){
    const querySnapshot = await getDocs(
      collection(doc(db, 'users', currentUser.uid), 'rewards')
    );
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    console.log(arr);
    let localSum = 0;
    for (let i = 0; i < arr.length; i++) {
      localSum += arr[i].points;
    }
    setSums(localSum);
  }
  }, []);
  useEffect(() => {
    setSize(
      dimensions.width > 1000
        ? 140
        : dimensions.width >= 700
        ? 100
        : dimensions.width > 500
        ? 80
        : 40
    );
    setTextSize(
      dimensions.width > 1000
        ? 'xl'
        : dimensions.width >= 700
        ? 'lg'
        : dimensions.width > 500
        ? 'base'
        : 'sm'
    );
  }, [!!dimensions.width]);
  return (
    <View >
            <View style={tw` bg-black`}>
          <Text
            style={[
              tw`text-white text-center  my-2`,
              {
                width:dimensions.screen.width,
                fontFamily: 'DancingScript',
                fontSize:
                  dimensions.screen.width < 760
                    ? 27
                    : dimensions.screen.width < 900
                    ? 35
                    : 40,
              },
            ]}
          >
            Life's Better When You Dance! &trade;
          </Text>
        </View>
      <View style={tw`w-full h-[85%] justify-center items-center m-auto max-w-[800px]`}>
      <View
      style={tw.style(`flex-row justify-center items-center w-full max-w-6xl`,{ margin: 'auto' })}
    >
       {icons.map((item, key) => {
        return <Pressable key={key} style={tw`flex justify-center items-center relative flex-wrap mt-1`} onPress={() =>
        navigation.navigate(item.link,item.params)
      }>
          <ShowIcon icon={item.title} color={'#000'} width={size1} height={size1}/>
          <Text
            style={tw`font-extrabold text-${textSize} text-[${'#000'}] text-center`}
          >
            {item.title}
          </Text>
        </Pressable>;
      })}
    </View>
        <View style={tw`h-[20%] w-[98%]`}>
          {currentUser.status == 'student' && (
            <Text style={tw`font-bold text-xl text-right text-[#776548]`}>
              Rewards Balance: {summed}
            </Text>
          )}
          <Text style={tw`font-bold text-2xl text-center mt-4 text-[#3D1152]`}>
            OUR NEWS
          </Text>
          <Text style={tw`font-bold  ${(dimensions.screen.width < 760)?'text-justify text-sm':"text-center text-lg"} m-2 text-[#776548]`}>Earn points for every activity you have participated in and spend them for dance accessories, lessons, and upcoming events in our studios.</Text>  
        </View>
        <View
          style={[
            tw`w-full justify-center items-center relative max-w-4xl`,
            { overflow: 'auto' }, { height: dimensions.screen.height*.55  }
          ]}
        >
          <View style={tw` absolute top-0 left-0 flex-row`}>
            {carousel.map((item, i) => (
              <View
                key={item.id}
                style={tw` h-96 w-64 bg-white/70  justify-start items-start rounded-md m-1`}
              >
               <ImageBackground source={item.url ? item.url : logo} resizeMode="contain" style={[
                    tw` h-64 w-64 rounded-md relative justify-center items-center`,
                    {
                      backgroundPosition: 'center',
                    },
                  ]}/>
                <Text
                  style={tw`text-lg font-extrabold mb-2 text-[#776548] text-center`}
                >
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}
  return (
    <Layout>
     {currentUser.studio? studioReady(): <></>}
    </Layout>
  )
};

export default Homescreen;

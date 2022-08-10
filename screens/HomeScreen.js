import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { useCollection } from 'react-firebase-hooks/firestore';

// import Swiper from 'react-native-swiper/src';
// const { width, height } = Dimensions.get('window');
const logo = require('../assets/dancerslogosm.png');
const Homescreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const [summed, setSums] = useState(0);
  const [carousel, setCarousel] = useState([{ url: '', text: '' }]);
  const [snapshot, loading, err] = useCollection(collection(db, 'settings'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  useEffect(() => {
    if (snapshot) {
      let arr1 = snapshot.docs.map((doc) => doc.data())[0].carousel;
      console.log(
        snapshot.docs[0].id
      );
      setCarousel(
        arr1.map((item, i) => ({ ...item, id: `image_carousel_${snapshot.docs[0].id+i}` }))
      );
    }
  }, [snapshot]);
  useEffect(async () => {
    let arr = [];
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
  }, []);

  return (
    <Layout>
      <View style={tw`w-full h-[85%] justify-center items-center`}>
        <View style={tw`h-[20%] w-[98%]`}>
        {currentUser.status=="student" &&<Text style={tw`font-bold text-xl text-right`}>
          Your rewards balance is: {summed}
        </Text>}
        <Text style={tw`font-bold text-2xl text-center mt-4 text-red-400`}>
          OUR NEWS
        </Text>
        </View>
        {/* <Swiper  width={width>900?800:Math.round(width*.8)} height={Math.round(height*.6)} loop={true} index={0} showsButtons> */}
        <View
          style={[tw`w-full h-[75%]  justify-center items-center relative max-w-4xl`,{ overflow: 'auto' }]}
        >
        <View style={tw` absolute top-0 left-0 flex-row`}>
          {carousel.map((item, i) => (
            <View
              key={item.id}
              style={tw` h-96 w-64 bg-white/70  justify-start items-start rounded-md m-1`}
            >
              <View
                style={[
                  tw` h-64 w-full rounded-md relative justify-center items-center`,
                    {
                      objectFit: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundImage: `url(${item.url?item.url:logo})`,
                    },

                ]}
              >

              </View>
              <Text
                  style={tw`text-lg font-extrabold mb-2 text-[#C9AB78] text-center`}
                >
                  {item.text}
                </Text>
            </View>
          ))}
          </View>
        </View>
        {/* </Swiper> */}

      </View>
    </Layout>
  );
};

export default Homescreen;

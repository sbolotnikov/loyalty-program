import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { db } from '../firebase';
import { collection, where, query, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import CountBox from '../components/CountBox';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../features/basketSlice';
import useDimensions from '../hooks/useDimensions';
const logo = require('../assets/dancerslogosm.png');
const Getstarscreen = ({ route, navigation }) => {
  const { currentUser } = useAuth();
  const { collectionName } = route.params;
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const [values, setValues] = useState({
    name: '',
    desc: '',
    price: 0,
    image: '',
    uid: '',
    amount: 0,
  });
  const conditions = [];
  conditions.push(
    where('price', collectionName == 'activities' ? '>' : '<', 0)
  );
  const [value, loading, error] = useCollection(
    query(collection(doc(db, 'studios', currentUser.studio), 'activities'), ...conditions),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [activities, setActivities] = useState([]);
  const { dimensions } =useDimensions();

  useEffect(() => {
    // if (value.docs!==undefined)
    // setAmounts(...Array(value.docs?.length).values(0))
    if (value)
      setActivities(
        value.docs.map((doc) => ({ ...doc.data(), amount: 1, uid: doc.id }))
      );
  }, [value]);
  //   const pickActivityToBasket=(e,{name, price, image, uid, amount})=>{
  //     e.preventDefault();
  //     console.log({name, price, image, uid, amount})

  //  }
  return (
    <Layout>
      <View style={tw` justify-start items-center flex-wrap w-full relative`}>
        <Text
          style={tw`font-extrabold text-2xl text-center mt-3 text-[#3D1152]`}
        >
          Choose your Activities
        </Text>
      </View>
      <View
        style={[
          tw`w-full justify-start items-center`,
          { overflow: 'scroll' }, ,{ height: dimensions.screen.height*.85  }
        ]}
      >
        {error && (
          <Text style={tw`text-red-600 text-xl ${error ? 'flex' : 'hidden'}`}>
            {error ? error : ''}
          </Text>
        )}
        {loading && (
          <Text
            style={tw`text-yellow-400 text-xl text-center ${
              loading ? 'flex' : 'hidden'
            }`}
          >
            {loading ? 'Collection: Loading...' : ''}
          </Text>
        )}

        {activities && (
          <View
            style={tw`w-full h-full flex-row flex-wrap justify-center items-center relative max-w-4xl`}
          >
            {activities.map((doc, i) => (
              <View
                key={doc.uid}
                style={tw` h-96 w-64 bg-white/70 justify-start items-start rounded-md m-1`}
              >
                <ImageBackground
                  source={doc.image ? doc.image : logo}
                  resizeMode="contain"
                  style={[
                    tw` h-64 w-full rounded-md relative justify-center items-center`,
                    {
                      backgroundPosition: 'center',
                    },
                  ]}
                >
                  <Text
                    style={tw`text-red-600 text-xl text-right font-extrabold absolute top-0 right-0 bg-white/60 rounded-md m-1`}
                  >
                    {doc.price}
                  </Text>
                  <Text
                    style={tw`text-2xl font-extrabold mb-2 text-[#3D1152] text-center w-full bg-white/60`}
                  >
                    {doc.name}
                  </Text>
                </ImageBackground>
                <Text
                  style={tw`text-lg font-extrabold mb-2 text-[#776548] text-center`}
                >
                  {doc.desc}
                </Text>
                <View
                  style={tw`w-full absolute bottom-0 right-0 flex-row  justify-between items-end mb-1 mr-1`}
                >
                  <CountBox
                    startValue={0}
                    setWidth={12}
                    onChange={(num) => {
                      let copyArr = activities;
                      copyArr[i].amount = num;
                      setActivities([...copyArr]);
                      let activity = {
                        name: copyArr[i].name,
                        price: copyArr[i].price,
                        image: copyArr[i].image,
                        uid: copyArr[i].uid,
                        amount: num,
                      };
                      dispatch(addToBasket(activity));
                    }}
                  />
                  {/* <Btn
              onClick={(e)=>pickActivityToBasket(e,doc)}
              title="Add"
              style={{ width: '28%',height:"32px", backgroundColor: '#3D1152'}}
            /> */}
                </View>
              </View>
            ))}
            <View style={tw` h-32 w-full`}></View>
          </View>
        )}
      </View>
    </Layout>
  );
};

export default Getstarscreen;

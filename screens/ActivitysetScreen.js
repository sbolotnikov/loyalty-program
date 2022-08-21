import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import tw from 'twrnc';
import { db } from '../firebase';
import { collection, where, query, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import EnterActivity from '../components/enterActivity';
import moment from 'moment';
import useAuth from '../hooks/useAuth';
import useDimensions from '../hooks/useDimensions';
const logo = require('../assets/dancerslogosm.png');
const ActivitysetScreen = ({ route, navigation }) => {
    const { collectionName } = route.params;
    const { currentUser } = useAuth();
    console.log(collectionName, currentUser.studio)
    const { dimensions } =useDimensions();
  const [switchEdit, setSwitchEdit] = useState(false);
  const [values, setValues] = useState({
    name: '',
    desc: '',
    price: 0,
    image: '',
    uid: '',
  });
  const conditions=[];
   conditions.push(where("price", (collectionName=='activities')?">":"<", 0));
  const [value, loading, error] = useCollection(query(collection(doc(db, 'studios', currentUser.studio), 'activities'), ...conditions), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

 const pickCardToEdit=(e,cardinfo)=>{
    e.preventDefault();
    setValues(cardinfo);
    setSwitchEdit(true);
 }
  return (
    <KeyboardAwareScrollView>
      <Layout>
       {switchEdit?<EnterActivity name={values.name} desc={values.desc} price={values.price*((collectionName=='activities')?1:-1) } image={values.image} uid={values.uid} collectionName={collectionName} onReturn={()=>setSwitchEdit(false)}/>:
       <View style={[tw`w-full h-full justify-center items-center m-auto`
            ]}>
        {error &&<Text style={tw`text-red-600 text-xl ${error ? 'flex' : 'hidden'}`}>
          {error ? error : ''}
        </Text>}
        <Text
          style={tw`text-yellow-400 text-xl ${loading ? 'flex' : 'hidden'}`}
        >
          {loading ? 'Collection: Loading...' : ''}
        </Text>
        {value && (
          <View
            style={[tw`w-full h-[85%] flex-row flex-wrap justify-center items-center relative max-w-4xl`,{ overflow: 'auto' }, { height: dimensions.screen.height*.85  }]}
          >
            {value.docs.map((doc) => (
              <TouchableOpacity onPress={(e)=>pickCardToEdit(e,{...doc.data(), uid:doc.id})} key={doc.id} style={tw` h-96 w-64 bg-white/70 rounded-md m-1`} >
              <ImageBackground source={doc.data().image?doc.data().image:logo} resizeMode="contain" style={[
                    tw` h-64 w-full rounded-md relative justify-center items-center`,
                    {
                      backgroundPosition: 'center',
                    },
                  ]}>
                
                  <Text
                    style={tw`text-red-600 text-xl text-right font-extrabold absolute top-0 right-0 bg-white/60 rounded-md m-1`}
                  >
                    {doc.data().price}
                  </Text>
                  <Text
                    style={tw`text-2xl font-extrabold mb-2 text-[#3D1152] text-center w-full bg-white/60`}
                  >
                    {doc.data().name}
                  </Text>
                </ImageBackground>

                <Text
                  style={tw`text-lg font-extrabold mb-2 text-[#776548] text-center`}
                >
                  {doc.data().desc}
                </Text>

                <Text style={tw`text-red-600 text-sm absolute bottom-0 left-0`}>
                  {doc.data().bywhom+'  '+moment(doc.data().updated?doc.data().updated.toDate().getTime():doc.data().created.toDate().getTime()).format('MMM DD YYYY, hh:mm') }
                </Text>
 
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={(e)=>pickCardToEdit(e,{ name: '', desc: '', price: 0, image: '', uid: ''})} style={tw` h-96 w-64 bg-white/70 rounded-md justify-center items-center m-1`} >
            <Text
                    style={tw`text-2xl font-extrabold mb-2 text-[#3D1152] text-center w-full bg-white/60`}
                  >
                    Add new
                  </Text>
            </TouchableOpacity>
            <View style={tw` h-32 w-full`}></View>
          </View>
        )}
        </View>}
      </Layout>
    </KeyboardAwareScrollView>
  );
};

export default ActivitysetScreen;

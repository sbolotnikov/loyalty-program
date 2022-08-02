import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import tw from 'twrnc';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import EnterActivity from '../components/enterActivity';
import moment from 'moment';
const logo = require('../assets/dancerslogosm.png');
const ActivitysetScreen = () => {

  const [switchEdit, setSwitchEdit] = useState(false);
  const [values, setValues] = useState({
    name: '',
    desc: '',
    price: 0,
    image: '',
    uid: '',
  });
  const [value, loading, error] = useCollection(collection(db, 'activities'), {
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
       {switchEdit?<EnterActivity name={values.name} desc={values.desc} price={values.price } image={values.image} uid={values.uid} onReturn={()=>setSwitchEdit(false)}/>:
       <View style={[tw`w-full h-full justify-center items-center m-auto`,{overflow:"scroll"}]}>
        <Text style={tw`text-red-600 text-xl ${error ? 'flex' : 'hidden'}`}>
          {error ? error : ''}
        </Text>
        <Text
          style={tw`text-yellow-400 text-xl ${loading ? 'flex' : 'hidden'}`}
        >
          {loading ? 'Collection: Loading...' : ''}
        </Text>
        {value && (
          <View
            style={tw`w-full h-full flex-row flex-wrap justify-center items-center relative max-w-4xl`}
          >
            {value.docs.map((doc) => (
              <TouchableOpacity onPress={(e)=>pickCardToEdit(e,{...doc.data(), uid:doc.id})} key={doc.id} style={tw` h-96 w-64 bg-white/70 rounded-md m-1`} >
                <View
                  style={[
                    tw` h-64 w-full rounded-md relative justify-center items-center`,
                    {
                      objectFit: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundImage: `url(${doc.data().image?doc.data().image:logo})`,
                    },
                  ]}
                >
                  <Text
                    style={tw`text-red-600 text-xl text-right font-extrabold absolute top-0 right-0 bg-white/60 rounded-md m-1`}
                  >
                    {doc.data().price}
                  </Text>
                  <Text
                    style={tw`text-2xl font-extrabold mb-2 text-[#0B3270] text-center w-full bg-white/60`}
                  >
                    {doc.data().name}
                  </Text>
                </View>

                <Text
                  style={tw`text-lg font-extrabold mb-2 text-[#C9AB78] text-center`}
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
                    style={tw`text-2xl font-extrabold mb-2 text-[#0B3270] text-center w-full bg-white/60`}
                  >
                    Add new
                  </Text>
            </TouchableOpacity>
          </View>
        )}
        </View>}
      </Layout>
    </KeyboardAwareScrollView>
  );
};

export default ActivitysetScreen;

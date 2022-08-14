import { View, Text, Image } from 'react-native';
import React from 'react';
import Layout from '../components/layout';
import tw from 'twrnc';
import { doc, collection, getDocs} from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import moment from 'moment';
import { Divider } from 'react-native-elements';


const Activityscreen = () => {
  const [activities, setActivities] = useState([]);
  const [summed, setSums] = useState(0);
  const { currentUser } = useAuth();
  useEffect(async () => {
    let arr=[];
    const querySnapshot = await getDocs(
      collection(doc(db, 'users', currentUser.uid), 'rewards'), 
    );
    querySnapshot.forEach((doc) => {
    arr.push({...doc.data(), id:doc.id, date:moment(doc.data().confirmed.toDate().getTime()).format()})
});
    
      arr.sort(function(a, b){return (b.date == a.date)?0:(b.date > a.date)?1:-1});
      console.log(arr);
      setActivities([...arr]);
   
  }, [])
    useEffect(() => {
    let localSum=0;
    for (let i = 0; i < activities.length; i++) {
       localSum+=activities[i].points
    }
    setSums(localSum);
  }, [activities]);
  return (
    <Layout>
      <View style={tw`w-full h-full justify-start items-center max-w-[800px] m-auto`}>
        <View style={tw` justify-around items-center flex-wrap w-full relative`}>
        <Text style={tw`font-extrabold text-2xl text-center mt-3 text-[#0B3270]`}>
            Activities
          </Text>
          <Text style={tw`font-extrabold text-xl text-[#0B3270]`}>
           of {currentUser.displayName}
          </Text>
          <Text style={tw` text-[#776548] w-full font-extrabold text-right absolute top-0 right-0`}>Balance: {summed}</Text>
        </View>
        <View
          style={[
            tw`w-[98%] h-[65%] justify-center items-center m-auto bg-[#c9ab78]/30 m-1 rounded-lg border border-[#776548] py-5 relative`,
            { overflow: 'auto' },
          ]}
        >
          <View style={tw`h-auto w-full absolute top-0 left-0`}>
            {activities.map((doc, i) => (
              <View key={doc.id} style={tw`flex-row justify-between w-[95%] items-center mx-auto my-5 h-auto flex-wrap`}>
                <View style={tw`w-[65%]`}>
                { (i>0)?(moment(doc.confirmed.toDate().getTime()).format('MMM DD YYYY')!= moment(activities[i-1].confirmed.toDate().getTime()).format('MMM DD YYYY')) && <Divider bold={true} color={'#776548'} width={5} />:<Divider bold={true}  color={'#776548'} width={5}/>} 
               { (i>0)?(moment(doc.confirmed.toDate().getTime()).format('MMM DD YYYY')!= moment(activities[i-1].confirmed.toDate().getTime()).format('MMM DD YYYY')) &&<Text style={tw`ml-2 font-extrabold text-xl text-[#0B3270]`}> Date: { moment(doc.confirmed.toDate().getTime()).format('MMM DD YYYY')} </Text>:<Text style={tw`ml-2 font-extrabold text-xl text-[#0B3270]`}> Date: { moment(doc.confirmed.toDate().getTime()).format('MMM DD YYYY')} </Text>}
                  <Text style={tw`ml-2 text-xl text-[#776548] `}>Time:{ moment(doc.confirmed.toDate().getTime()).format(' hh:mm')}  Activity:{doc.name}</Text>
                  <Text style={tw`ml-2`}> Amount: {doc.amount}</Text>
                  <Text style={tw`ml-2`}>  Confirmed by : {doc.cofimedby} </Text>
                  <Text style={tw`ml-2`}> Note: {doc.note} </Text>
                  <Text style={tw`ml-2`}> </Text>
                </View>
                <View style={tw`w-[35%] flex-row`}>
                  <Text style={tw`w-full ${(doc.points>0)?"text-center":"text-right"}`}>Points: <Text style={tw`${(doc.points<0)?"text-red-600":"text-green-600"}`}>{doc.points}</Text></Text>
                </View> 
              </View>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Activityscreen;

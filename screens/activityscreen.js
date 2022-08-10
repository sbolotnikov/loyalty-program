import { View, Text, Image } from 'react-native';
import React from 'react';
import Layout from '../components/layout';
import tw from 'twrnc';
import { doc, collection, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import moment from 'moment';
const Activityscreen = () => {
  const [activities, setActivities] = useState([]);
  const [summed, setSums] = useState(0);
  const { currentUser } = useAuth();
  useEffect(async () => {
    let arr=[];
    const querySnapshot = await getDocs(
      collection(doc(db, 'users', currentUser.uid), 'rewards'),orderBy("confirmed", "desc"), 
    );
    querySnapshot.forEach((doc) => {
    arr.push({...doc.data(), id:doc.id})
});
    console.log(arr);
      // arr.sort(function(a, b){return b.confirmed.seconds - a.confirmed.seconds});
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
      <View style={tw`w-full h-full justify-center items-center max-w-[800px] m-auto`}>
        <View style={tw`flex-row justify-around items-center flex-wrap w-full`}>
          <Text style={tw`font-extrabold text-xl text-red-400`}>
            Activities of {currentUser.displayName}
          </Text>
          <Text style={tw` text-red-400 font-extrabold text-right`}>Total points available: {summed}</Text>
        </View>
        <View
          style={[
            tw`w-[98%] h-[60%] justify-center items-center m-auto bg-gray-500/30 m-1 rounded-lg border py-5 relative`,
            { overflow: 'scroll' },
          ]}
        >
          <View style={tw`h-auto absolute top-0 left-0`}>
            {activities.map((doc, i) => (
              <View key={doc.id} style={tw`flex-row justify-between w-[95%] items-center mx-auto my-5 h-auto flex-wrap`}>
                <View style={tw`w-[65%]`}>
                  <Text style={tw`ml-2`}> Activity:{doc.name}</Text>
                  <Text style={tw`ml-2`}> Amount: {doc.amount}</Text>
                  <Text style={tw`ml-2`}>  Confirmed by : {doc.cofimedby} </Text>
                  <Text style={tw`ml-2`}> Note: {doc.note} </Text>
                  <Text style={tw`ml-2`}> Date: { moment(doc.confirmed.toDate().getTime()).format('MMM DD YYYY, hh:mm')} </Text>
                </View>
                <View style={tw`w-[35%] flex-row`}>
                  <Text style={tw`text-center`}>Points: {doc.points}</Text>
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

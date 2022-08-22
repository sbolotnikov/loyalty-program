import { View, Text, Modal, Image, Dimensions, TouchableOpacity, } from 'react-native';
import { useEffect, useState } from "react";
import tw from 'twrnc';
import Btn from './Btn';
import { useSelector, useDispatch } from "react-redux"
import { selectBasketItems, selectTotal, addToBasket } from '../features/basketSlice';
import CountBox from './CountBox';
import useAuth from '../hooks/useAuth';
import {  Timestamp } from 'firebase/firestore';
import QRCode from "react-qr-code";
import useDimensions from '../hooks/useDimensions';
const logo = require('../assets/dancerslogosm.png');

const BasketModal = ({ vis, onReturn }) => {
  const { currentUser } = useAuth();
  const items = useSelector(selectBasketItems);
  const totals = useSelector(selectTotal);
  const dispatch = useDispatch();
  const [activities, setActivities]= useState(items);
  const { dimensions } =useDimensions();

  useEffect(()=>{
    if (currentUser.status=="student") setActivities([...items])
  },[items])
   const getInfo=(activities)=>{
    let arr1=[]; 
    let arr2=[];
    for (let i=0;i<activities.length;i++){
      arr1.push(activities[i].uid);
      arr2.push(activities[i].amount);
    }
    let obj="";
    if (currentUser.status=="student") obj=JSON.stringify({a:[currentUser.uid, Timestamp.now().seconds.toString()], b:arr1, c:arr2})
    console.log(obj)
    return obj;
   }
    return (
       <View style={tw` flex-1 justify-center items-center ${!vis?"h-0":""}`}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {}}
      >
        <View
          style={tw`flex-1 justify-center items-center w-full h-full bg-black/30`}
        >

          <View
            style={[tw` justify-center items-center bg-white w-[92%] h-[95%] max-w-[800px] rounded-md relative`,{shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, shadowRadius: 10, elevation: 5}]}
          >
          <TouchableOpacity style={tw`absolute top-0 right-0 mr-3 mt-3`} onPress={()=>onReturn()}>
            <Text>Close</Text>
          </TouchableOpacity>
            <Text style={tw`text-red-600 text-xl m-2`}>Claiming Rewards/Activities</Text>
            <View
              style={[tw` justify-around items-center w-full h-[40%] relative m-4`,{overflow:"scroll"}]}
            >
            <View style={tw`absolute top-0 left-0`}>
             {activities.map((doc, i)=>(
              <View key={doc.uid}
              style={tw`flex-row justify-between w-[95%] items-center mx-auto my-2`}>
              <View style={tw`w-[65%] flex-row`}>
               <Image
              source={doc.image? doc.image : logo}
              style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
             />
               <Text style={tw`ml-2`}>{doc.name}</Text>
              </View> 
              <View style={tw`w-[35%] ${dimensions.screen.width>576?'flex-row':''} justify-between`}>
               <CountBox startValue={doc.amount} setWidth={2} onChange={(num)=>{
                  let activity={name:doc.name, price:doc.price, image:doc.image, uid:doc.uid, amount:num}
                  dispatch(addToBasket(activity))
                  }}/>
                  <Text style={tw`text-center`}> x {doc.price} = {doc.price*doc.amount}</Text>
              </View>    
             </View>))
             }
             <Text>Total amount: {totals}</Text>
             </View>
            </View>
            <QRCode value={getInfo(activities)} size={300} />
          </View>       
        </View>
      </Modal>
    </View>
    )
  }


export default BasketModal


import { useState } from "react";
import {View,Text, TextInput, TouchableOpacity} from "react-native"
import tw from 'twrnc';
export default function CountBox({startValue, setWidth,onChange}){
    const [number, onChangeNumber] = useState(startValue);
    const changeNumber=(e,isAdd)=>{
        e.preventDefault();
        let increment=isAdd?1:-1;
        if((number==0)&&(!isAdd)) increment=0
        onChangeNumber(parseFloat(number)+increment)
        onChange(parseFloat(number)+increment)
    }
    return <View style={tw`flex-row justify-center items-center ml-2`}>
<TouchableOpacity style={tw`rounded-full bg-[#3D1152] mr-2`} onPress={(e)=>changeNumber(e,false)}>
    <Text style={tw` font-extrabold text-white text-xl px-3 mb-1`}>-</Text>
</TouchableOpacity>
        <TextInput style={tw` h-8 w-${setWidth} justify-center items-center`} onChangeText={onChangeNumber}
        value={number}/>
        <TouchableOpacity style={tw`rounded-full bg-[#3D1152] ml-2`} onPress={(e)=>changeNumber(e,true)}>
    <Text style={tw`font-extrabold text-white text-xl px-2 mb-1`}>+</Text>
</TouchableOpacity>
    </View>
}
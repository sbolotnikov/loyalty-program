import React from 'react'
import {Text, TouchableOpacity} from "react-native"
import tw from 'twrnc';
export default function Btn(props){
    return <TouchableOpacity style={{...tw`h-11 w-[92%] rounded-full mt-5 bg-[#3D1152] justify-center items-center`,...props.style}} onPress={props.onClick}>
        <Text style={tw`font-semibold text-xl text-white`}>{props.title}</Text>
    </TouchableOpacity>
}
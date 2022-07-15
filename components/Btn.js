import React from 'react'
import {Text, TouchableOpacity} from "react-native"

export default function Btn(props){
    return <TouchableOpacity className="h-11 w-[92%] rounded-full mt-5 bg-[#0B3270] justify-center items-center" onPress={props.onClick}  style={props.style}>
        <Text className="font-semibold text-xl text-white">{props.title}</Text>
    </TouchableOpacity>
}
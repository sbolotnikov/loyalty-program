import React from 'react'
import {View, TextInput} from "react-native"

export default function TextBox(props){
    return <View className="h-11 w-[92%]  mt-5">
        <TextInput  className="h-11 mt-0 border rounded-full border-[#0B3270] pl-4 w-full" {...props} />
    </View>
}
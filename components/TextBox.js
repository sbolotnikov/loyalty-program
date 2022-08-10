import {View, TextInput} from "react-native"
import tw from 'twrnc';
export default function TextBox(props){
    return <View style={tw`h-11 w-[92%] rounded-full mt-5 bg-white justify-center items-start`}>
        <TextInput style={tw`mt-0 h-11 pl-3 w-full rounded-full border-2 border-[#C9AB78]`} {...props} />
    </View>
}
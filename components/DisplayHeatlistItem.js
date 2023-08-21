import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
const DisplayHeatlistItem = ({textLine, textLine1, textLine2, highlight}) => {
    const [visible, setVisible] = useState(false);
  return (
    <View style={[tw`w-full flex-col ${highlight?"border-4 rounded border-red-500":""}`,]}>
      <View style={[tw`w-full flex-row`,{backgroundColor:(visible)?"#3D1152":""}]}>
        <Text style={[tw`w-2/5 text-center text-lg`,{color:(visible ?"white":"black")}]}>{textLine }</Text>
        <View style={[tw`w-3/5 flex-row`]}>
          <Text style={[tw`w-[85%] text-center text-lg`,{color:(visible ?"white":"black")}]}>{textLine1}</Text>
          <TouchableOpacity style={[tw`w-[15%] `]} onPress={()=>setVisible(!visible)}>
            <Text style={[tw`font-bold text-2xl`,{color:(visible ?"white":"black")}]}>{visible?'-':"+"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {visible &&<View style={[tw`w-full flex-col bg-[#a7b6e2]`]}>
         <View style={[tw`w-full flex-row`]}>
          <Text
            style={[
              tw`w-[15%] text-left ml-3 font-semibold text-lg`,
              { fontFamily: 'Georgia' },
            ]}
          >
            Event:
          </Text>
          <Text style={[tw`w-[83%] text-center `]}>{textLine2}</Text>
        </View>
      </View>}
    </View>
  );
}

export default DisplayHeatlistItem
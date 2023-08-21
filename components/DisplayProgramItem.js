import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
const DisplayProgramItem = ({ number, participants, event1, studio, endOfCategory }) => {
    const [visible, setVisible] = useState(false);
  return (
    <View style={[tw`w-full flex-col`,{borderBottom: `3px solid ${(event1==endOfCategory)?'transparent':"#c9ab78"}`}]}>
      <View style={[tw`w-full flex-row`,{backgroundColor:(visible)?"#3D1152":""}]}>
        <Text style={[tw`w-1/5 text-center text-lg`,{color:(visible ?"white":"black")}]}>{number}</Text>
        <View style={[tw`w-4/5 flex-row`]}>
          <Text style={[tw`w-[85%] text-center text-lg`,{color:(visible ?"white":"black")}]}>{participants}</Text>
          <TouchableOpacity style={[tw`w-[15%] `]} onPress={()=>setVisible(!visible)}>
            <Text style={[tw`font-bold text-2xl`,{color:(visible ?"white":"black")}]}>{visible?'-':"+"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {visible &&<View style={[tw`w-full flex-col bg-[#a7b6e2]`]}>
        {event1>''&&<View style={[tw`w-full flex-row`]}>
          <Text
            style={[
              tw`w-[15%] text-left ml-3 font-semibold text-lg`,
              { fontFamily: 'Georgia' },
            ]}
          >
            Event:
          </Text>
          <Text style={[tw`w-[83%] text-center `]}>{event1}</Text>
        </View>}
        <View style={[tw`w-full flex-row`]}>
          <Text
            style={[
              tw`w-[15%] text-left ml-3 font-semibold text-lg`,
              { fontFamily: 'Georgia' },
            ]}
          >
            Studio:
          </Text>
          <Text style={[tw`w-[83%] text-center `]}>{studio}</Text>
        </View>
      </View>}
    </View>
  );
};

export default DisplayProgramItem;

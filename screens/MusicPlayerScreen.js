import { View, Text } from 'react-native'
import { useState } from 'react'
import Layout from '../components/layout';
import tw from 'twrnc';
import useDimensions from '../hooks/useDimensions';
const music1 = require('../assets/music/kermit-happy-birthday.mp3');

const MusicPlayerScreen = () => {
  const [ range, setRange ] = useState(0)
  const { dimensions } =useDimensions();
  return (
    <Layout>
      <Text>MusicPlayerScreen</Text>
      <View style={[tw`bg-blue-300`,{ width: dimensions.screen.width*.65 } ]}>
      <audio  controls>
  <source src={music1+'#t='+"3"+","+"7"} playbackRate={0.5} type="audio/mpeg"/>
 
  Your browser does not support HTML5 video.
</audio>
        </View>
    </Layout>
  )
}

export default MusicPlayerScreen
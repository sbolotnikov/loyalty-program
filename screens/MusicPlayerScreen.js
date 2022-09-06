import { useEffect, useState, useRef } from 'react';
import Layout from '../components/layout';
import tw from 'twrnc';
import Slider from '@react-native-community/slider';
import { Text, View } from 'react-native';
import MusicPlayer from '../components/MusicPlayer';
import ChooseFiles from '../components/ChooseFiles';

const music1 = require('../assets/music/kermit-happy-birthday.mp3');
const music2 ='https://drive.google.com/file/d/0B07LcArbNiNPZVBXM0E0NmJZM0NGeTJhUjUyOEw4dTlTQWM0/view?usp=sharing&resourcekey=0-BdwNSPTpu1sL2xsSqspTqA';
// const music3='https://drive.google.com/file/d/0B07LcArbNiNPZVBXM0E0NmJZM0NGeTJhUjUyOEw4dTlTQWM0/view?usp=sharing&resourcekey=0-BdwNSPTpu1sL2xsSqspTqA';
const music3= 'https://ia800200.us.archive.org/3/items/favouritescenesshakespeare_1603_librivox/favouritescenes_03_shakespeare_128kb.mp3';
const MusicPlayerScreen = () => {
  const [musicFile, setMusicFile] = useState({ uri: '', name: '' });
  const [songLength, setSongLength] = useState(180000);
  return (
    <Layout>
      <View
        style={tw`w-full h-full justify-start items-center max-w-[800px] m-auto`}
      >
        <Text>Music Player</Text>
        <Text>Song Title: {musicFile.name}</Text>
        <MusicPlayer
          rateSet={1}
          songDuration={songLength}
          startPos={0}
          music={musicFile.uri}
          onSongEnd={() => {
            console.log("end of song")
            setMusicFile({ uri: music3, name: 'Shekspire' });
          }}
        />
        <ChooseFiles onFileChoice={(file) => setMusicFile(file)} />
      </View>
    </Layout>
  );
};

export default MusicPlayerScreen;

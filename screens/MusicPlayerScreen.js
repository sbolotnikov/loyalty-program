import { useEffect, useState, useRef } from 'react';
import Layout from '../components/layout';
import tw from 'twrnc';
import Slider from '@react-native-community/slider';
import { Text, View } from 'react-native';
import MusicPlayer from '../components/MusicPlayer';
import ChooseFiles from '../components/ChooseFiles';
import SongPlayList from '../components/SongPlayList';
import SongSelectModal from '../components/SongSelectModal';
import PlayerButtons from '../components/svg/PlayerButtons';
const music1 = require('../assets/music/kermit-happy-birthday.mp3');
const music2 ='https://drive.google.com/file/d/0B07LcArbNiNPZVBXM0E0NmJZM0NGeTJhUjUyOEw4dTlTQWM0/view?usp=sharing&resourcekey=0-BdwNSPTpu1sL2xsSqspTqA';
// const music3='https://drive.google.com/file/d/0B07LcArbNiNPZVBXM0E0NmJZM0NGeTJhUjUyOEw4dTlTQWM0/view?usp=sharing&resourcekey=0-BdwNSPTpu1sL2xsSqspTqA';
const music3= 'https://ia800200.us.archive.org/3/items/favouritescenesshakespeare_1603_librivox/favouritescenes_03_shakespeare_128kb.mp3';
const MusicPlayerScreen = () => {
  const [musicFile, setMusicFile] = useState({ uri: '', name: '' });
  const [songLength, setSongLength] = useState(180000);
  const [songPosition, setSongPosition] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Layout>
      <View
        style={tw`w-full h-full justify-start items-center max-w-[800px] m-auto`}
      >
         <SongSelectModal
            title={`Select dance`}
            button1={'Ok'}
            button2={''}
            vis={modalVisible}
            onReturn={(ret) => setModalVisible(false)}
            
          />
        <Text style={tw`font-bold text-xl text-black`}>Music Player</Text>
        <Text>Song Title: {musicFile.name}</Text>
        <MusicPlayer
          rateSet={1}
          songDuration={songLength}
          startPos={songPosition}
          music={musicFile.uri}
          onSongEnd={() => {
            console.log("end of song")
            setMusicFile({ uri: music3, name: 'Shekspire' });
          }}
        />
        <ChooseFiles fileType={'audio/*'} multiple={true} onFileChoice={(file) => setMusicFile(file)} />
        <SongPlayList onSongChoice={(song)=>{console.log(song)}} />
        <PlayerButtons icon={'List'} color={'#776548'} color2={'#C9AB78'} size={40} onButtonPress={()=>setModalVisible(true)}/>
      </View>
    </Layout>
  );
};

export default MusicPlayerScreen;

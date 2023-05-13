import { View, Text, Modal } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
// import Video from "react-native-video";
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useState, useRef } from 'react';
import useDimensions from '../hooks/useDimensions';
const VideoPlayingModal = ({
  videoUri,
  button1,
  button2,
  heatNum,
  vis,
  onReturn,
  onChangeRate,
  onChangeDuration,
}) => {
  const handleSubmit = (e, submitten) => {
    e.preventDefault();
    onReturn(submitten);
  };

  const video = useRef(null);
  const [status, setStatus] = useState({});
  const { dimensions } = useDimensions();
  console.log(dimensions);
  return (
    <View style={tw` flex-1 justify-center items-center absolute top-0 left-0`}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {}}
      >
        <View
          style={tw` justify-center items-center bg-white rounded-md border w-[100%] h-[100%]`}
        >
          {/* <Video
            source={{
              uri: videoUri,
            }}
            style={{
              height: dimensions.screen.height,
              position: 'absolute',
              top: 0,
              left: 0,
              alignItems: 'stretch',
              bottom: 0,
              right: 0,
            }}
            muted={true}
            repeat={true}
            resizeMode={'cover'}
            rate={1.0}
            ignoreSilentSwitch={'obey'}
          /> */}
          <Video
            ref={video}
            style={{
            //   height: dimensions.screen.height,
              position: 'absolute',
              inset:0,
              alignItems: 'stretch',
              width: dimensions.screen.width,
            }}
            source={{
              uri: videoUri,
            }}
            useNativeControls
            shouldPlay
            resizeMode={ResizeMode.COVER}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />

          {/* <Btn
              onClick={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
              title={status.isPlaying ? 'Pause' : 'Play'}
              style={{ width: '48%', backgroundColor: '#3D1152', marginTop: 0 }}
            /> */}
          <Btn
            onClick={(e) => handleSubmit(e, button1)}
            title={`Current heat # ${heatNum}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '48%',
              backgroundColor: '#C9AB78',
              zIndex: 100,
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default VideoPlayingModal;

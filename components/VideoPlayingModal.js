import { View, Text, Modal } from 'react-native';
import tw from 'twrnc';
import Btn from './Btn';
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useState, useRef } from 'react';
import useDimensions from '../hooks/useDimensions';
const VideoPlayingModal = ({
  videoUri,
  button1,
  compName,
  heatNum,
  vis,
  onReturn,
}) => {
  const handleSubmit = (e, submitten) => {
    e.preventDefault();
    onReturn(submitten);
  };

  const video = useRef(null);
  const [status, setStatus] = useState({});
  const { dimensions } = useDimensions();
  return (
    <View
      style={tw` flex-1 justify-center items-center w-[100%] h-[100%] absolute top-0 left-0`}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {}}
      >
        <View
          style={tw` justify-start items-center bg-black  w-[${dimensions.screen.width}px] h-[${dimensions.screen.height}px]`}
        >
          <View
            onClick={(e) => handleSubmit(e, button1)}
            style={[
              tw`flex-1 justify-start items-center `,
              { cursor: 'pointer' },
            ]}
          >
            {/* absolute top-0 left-0 */}
            <Text
              style={[
                tw`text-white font-bold text-5xl m-0`,
                {
                  // textShadow: '5px 5px #C9AB78',
                },
              ]}
            >
              {heatNum}
            </Text>
          </View>
          <View
            style={[
              tw`flex justify-center items-center overflow-hidden`,
              { width: '93%', height: '93%' },
            ]}
          >
            <Video
              ref={video}
              style={{
                width: `${dimensions.screen.width * 0.98}px`,
                height: `${dimensions.screen.height * 0.78}px`,
                overflow: 'hidden',
              }}
              source={{
                uri: videoUri,
              }}
              isMuted
              resizeMode={ResizeMode.COVER}
              useNativeControls
              shouldPlay
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </View>
          <View 
            style={[
              tw`flex-1 justify-center items-center w-full`, 
            ]}
          > 
            <Text
              style={[
                tw`text-white font-bold text-5xl m-0`,
                {
                  textShadow: '5px 5px #C9AB78',
                },
              ]}
            >
              {compName}
            </Text>
          </View>
          {/* <Btn
            onClick={(e) => handleSubmit(e, button1)}
            title={heatNum}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '48%',
              backgroundColor: '#C9AB78',
              zIndex: 100,
            }}
          /> */}
        </View>
      </Modal>
    </View>
  );
};

export default VideoPlayingModal;

import { View, Text, Modal, Image } from 'react-native';
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
  mode,
  fontSize,
  seconds,
  displayedPictures,
  vis,
  onReturn,
  heatText,
}) => {
  const handleSubmit = (e, submitten) => {
    e.preventDefault();
    onReturn(submitten);
  };

  const video = useRef(null);
  const [status, setStatus] = useState({});
  const { dimensions } = useDimensions();
  const [firstTime, setFirstTime] = useState(true);
  const [activePic, setActivePic] = useState(0);
  const [nextActivePic, setNextActivePic] = useState(0);
  const nextActive = (num) => {
    let timerInterval = setInterval(function () {
      clearInterval(timerInterval);
      let localPic = num;
      if (localPic < displayedPictures.length - 1) localPic++;
      else localPic = 0;
      // setNextActivePic(localPic)
      setActivePic(localPic);
      nextActive(localPic);
    }, seconds * 1000);
  };

  useEffect(() => {
    if (mode == 'Auto') nextActive(0);
  }, [mode]);
  useEffect(() => {
    if (!firstTime) {
      let imgEl = document.getElementById(`image${activePic}`);

      let imgEl1 = document.getElementById(`image${nextActivePic}`);
    } else setFirstTime(false);
  }, [nextActivePic]);

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
          style={tw`  w-[${dimensions.screen.width}px] h-[${dimensions.screen.height}px]`}
        >
          {mode == 'Video' ? (
            <View
              style={tw`w-full h-full flex justify-start items-center bg-black`}
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
                    tw`text-white font-bold text-3xl m-0`,
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
              <View style={[tw`flex-1 justify-center items-center w-full`]}>
                <Text
                  style={[
                    tw`text-white font-bold text-3xl m-0`,
                    {
                      textShadow: '5px 5px #C9AB78',
                    },
                  ]}
                >
                  {compName}
                </Text>
              </View>
            </View>
          ) : mode == 'Auto' ? (
            <View
              style={tw`w-full h-full flex justify-start items-center bg-black`}
            >
              {displayedPictures.map((item, index) => (
                <View
                  key={'img' + index}
                  style={tw`absolute inset-0 m-auto w-full h-full ${
                    index !== activePic ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <Image
                    id={'image' + index}
                    source={item.image}
                    resizeMethod={'scale'}
                    resizeMode={'center'}
                    style={tw`h-full w-auto`}
                  />
                </View>
              ))}
            </View>
          ): mode == 'Heats' ? (
            <View
              style={tw`w-full h-full flex justify-center items-center bg-black`}
            >
            
          <Text style={tw`text-white text-[${fontSize}px]`}>{heatText}</Text>

        </View>
          ) : (
            <View>
              <Text>Underfined</Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default VideoPlayingModal;

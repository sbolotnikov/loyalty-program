import { Button, Modal, View } from 'react-native';
import tw from 'twrnc';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import Btn from './Btn';

const ColorChoiceModal = (props) => {
  return (
    <View style={tw` flex-1 justify-center items-center absolute top-0 left-0`}>
      <Modal visible={props.vis} animationType="slide">
        <View
          style={tw`flex-1 justify-end items-center w-full h-full bg-black/30`}
        >
          <View
            style={[
              tw` justify-center items-center bg-white w-[92%] h-[62%] max-w-[800px] rounded-md relative`,
              {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                elevation: 5,
              },
            ]}
          >
            <ColorPicker
              style={{ width: '70%' }}
              value="red"
              onComplete={(ret)=>{props.onSelectColor(ret)}}
            >
              <Preview />
              <Panel1 />
              <HueSlider />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
            <Btn
              onClick={() => props.onClose(true)}
              title={'Close'}
              style={{ width: '90%', backgroundColor: '#3D1152' }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ColorChoiceModal;

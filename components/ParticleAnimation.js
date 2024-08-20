import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, G, Rect } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const AnimatedG = Animated.createAnimatedComponent(G);

const ParticleAnimation = () => {
  const [particleCount, setParticleCount] = useState(100);
  const [maxSize, setMaxSize] = useState(20);
  const [animationOption, setAnimationOption] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(2);
  const [speedVariation, setSpeedVariation] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [originX, setOriginX] = useState(width / 2);
  const [originY, setOriginY] = useState(height / 2);
  const [rainAngle, setRainAngle] = useState(90);
  const [particles, setParticles] = useState([]);

  const createParticle = useCallback(() => {
    const size = animationOption === 2 ? maxSize : Math.random() * maxSize;
    const d = `M0,-${size} L${size / 4},-${size / 4} L${size},0 L${size / 4},${size / 4} L${size / 2},${size} L0,${size / 2} L-${size / 2},${size} L-${size / 4},${size / 4} L-${size},0 L-${size / 4},-${size / 4} Z`;

    let startX, startY, endX, endY;
    if (animationOption === 1 || animationOption === 2) {
      const edge = Math.floor(Math.random() * 4);
      if (animationOption === 1) {
        [startX, startY] = [originX, originY];
        [endX, endY] = edge === 0 ? [Math.random() * width, height] :
                       edge === 1 ? [Math.random() * width, 0] :
                       edge === 2 ? [0, Math.random() * height] :
                                    [width, Math.random() * height];
      } else {
        [endX, endY] = [originX, originY];
        [startX, startY] = edge === 0 ? [Math.random() * width, height] :
                           edge === 1 ? [Math.random() * width, 0] :
                           edge === 2 ? [0, Math.random() * height] :
                                        [width, Math.random() * height];
      }
    } else {
      const angle = (rainAngle * Math.PI) / 180;
      startX = Math.random() * width;
      startY = Math.random() * height;
      endX = startX + Math.cos(angle) * height;
      endY = startY + Math.sin(angle) * height;
    }

    const x = useSharedValue(startX);
    const y = useSharedValue(startY);
    const scale = useSharedValue(animationOption === 1 ? 0 : size / 24);
    const particleSpeed = animationSpeed * (1 + (Math.random() - 0.5) * speedVariation);

    const animatedProps = useAnimatedProps(() => ({
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: scale.value },
      ],
    }));

    useEffect(() => {
      const duration = 10000 / particleSpeed;
      const easing = Easing.linear;

      x.value = withRepeat(
        withTiming(endX, { duration, easing }),
        -1,
        false
      );
      y.value = withRepeat(
        withTiming(endY, { duration, easing }),
        -1,
        false
      );
      scale.value = withRepeat(
        withTiming(animationOption === 1 ? size / 24 : 0, { duration, easing }),
        -1,
        false
      );
    }, []);

    return (
      <AnimatedG animatedProps={animatedProps} key={Math.random()}>
        <Path
          d={d}
          fill={`hsl(${Math.random() * 360}, 100%, 50%)`}
        />
      </AnimatedG>
    );
  }, [animationOption, maxSize, originX, originY, rainAngle, animationSpeed, speedVariation]);

  useEffect(() => {
    setParticles(Array(particleCount).fill().map(createParticle));
  }, [particleCount, createParticle]);

  return (
    <View style={styles.container}>
      <Svg width={width} height={height * 0.6} style={styles.svg}>
        <Rect width="100%" height="100%" fill={backgroundColor} />
        {particles}
      </Svg>
      <View style={styles.controls}>
        <Text>Particle Count: {particleCount}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={1000}
          value={particleCount}
          onValueChange={(value) => setParticleCount(Math.round(value))}
        />
        <Text>Max Size: {maxSize}</Text>
        <Slider
          style={{ width: '100%', height: 40}}
          minimumValue={1}
          maximumValue={100}
          value={maxSize}
          onValueChange={(e)=>setMaxSize(e.toFixed(0))}
        />
        <Text>Animation Option:</Text>
        <Picker
          selectedValue={animationOption}
          onValueChange={(itemValue) => setAnimationOption(itemValue)}
        >
          <Picker.Item label="Towards Viewer" value={1} />
          <Picker.Item label="Away from Viewer" value={2} />
          <Picker.Item label="Rain" value={3} />
        </Picker>
        <Text>Animation Speed: {animationSpeed}</Text>
        <Slider
          style={{ width: '100%', height: 40}}
          minimumValue={1}
          maximumValue={10}
          value={animationSpeed}
          onValueChange={setAnimationSpeed}
        />
        <Text>Speed Variation: {speedVariation}</Text>
        <Slider
          style={{ width: '100%', height: 40}}
          minimumValue={0}
          maximumValue={2}
          step={0.1}
          value={speedVariation}
          onValueChange={setSpeedVariation}
        />
        {animationOption === 3 && (
          <>
            <Text>Rain Angle: {rainAngle}°</Text>
            <Slider
              style={{ width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={360}
              value={rainAngle}
              onValueChange={setRainAngle}
            />
          </>
        )}
        {(animationOption === 1 || animationOption === 2) && (
          <>
            <Text>Origin X: {originX}</Text>
            <Slider
              style={{ width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={width}
              value={originX}
              onValueChange={(e)=> setOriginX(e.toFixed(0))}
            />
            <Text>Origin Y: {originY}</Text>
            <Slider
              style={{ width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={height}
              value={originY}
              onValueChange={(e)=>setOriginY(e.toFixed(0))}
            />
          </>
        )}
        {/* Add other sliders and controls here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  svg: {
    backgroundColor: '#000',
  },
  controls: {
    padding: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default ParticleAnimation;
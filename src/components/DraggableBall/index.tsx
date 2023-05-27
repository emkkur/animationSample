import {FC, useState} from 'react';
import {LayoutChangeEvent, Pressable, Text} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';

import styles from './styles';

type DraggableBallTypes =
  | {
      shouldSnapBack: true;
      destinationPosition: {x: number; y: number};
    }
  | {
      shouldSnapBack: false;
      destinationPosition: never;
    };

const DraggableBall: FC<DraggableBallTypes> = ({
  shouldSnapBack,
  destinationPosition,
}) => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});
  const current = useSharedValue({x: 0, y: 0});
  const final = useSharedValue({x: 0, y: 0});

  const [isLocked, setIsLocked] = useState(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value.x},
        {translateY: offset.value.y},
        {scale: withSpring(isPressed.value ? 1.2 : 1)},
      ],
      backgroundColor: isPressed.value ? 'black' : 'blue',
    };
  });

  const onBallLayout = (e: LayoutChangeEvent) => {
    const {x, y} = e.nativeEvent.layout;
    const translationX = destinationPosition.x - x;
    const translationY = destinationPosition.y - y;
    final.value = {x: translationX, y: translationY};
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(e => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      current.value.x = e.absoluteX;
      current.value.y = e.absoluteY;
    })
    .onFinalize(e => {
      isPressed.value = false;
      if (shouldSnapBack) {
        const xParam = {
          min: destinationPosition.x - 120,
          max: destinationPosition.x + 120,
        };
        const yParam = {
          min: destinationPosition.y - 120,
          max: destinationPosition.y + 120,
        };
        const {absoluteX, absoluteY} = e;
        if (
          xParam.min <= absoluteX &&
          absoluteX <= xParam.max &&
          yParam.min <= absoluteY &&
          absoluteY <= yParam.max
        ) {
          offset.value = {x: final.value.x, y: final.value.y};
          start.value = {x: final.value.x, y: final.value.y};
          runOnJS(setIsLocked)(true);
          return;
        }
        if (!isLocked) {
          offset.value = {x: 0, y: 0};
          start.value = {x: 0, y: 0};
        }
      }
    });

  const snapBack = () => {
    offset.value.x = withTiming(0, {duration: 600});
    offset.value.y = withTiming(0, {duration: 600});
    start.value = {x: 0, y: 0};
    setIsLocked(false);
  };

  return (
    <GestureDetector gesture={gesture.enabled(!isLocked)}>
      <Animated.View
        style={[styles.ball, animatedStyles]}
        onLayout={onBallLayout}
        entering={ZoomIn}>
        <Pressable onPress={snapBack} style={styles.ball}>
          <Text style={styles.text}>Landing Page</Text>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableBall;

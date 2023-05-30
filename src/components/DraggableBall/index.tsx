import {FC, useEffect, useState} from 'react';
import {LayoutChangeEvent, Pressable, ViewStyle} from 'react-native';

import {Text} from '@rneui/themed';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';

import styles from './styles';

type DraggableBallCommonProps = {
  ballStyles?: ViewStyle;
  onPlaced?: () => void;
  onCancel?: () => void;
  canCancel: boolean;
  shouldSnapBack: boolean;
  destinationPosition?: {x: number; y: number};
};

const DraggableBall: FC<DraggableBallCommonProps> = ({
  shouldSnapBack,
  destinationPosition,
  onPlaced,
  canCancel,
  onCancel,
}) => {
  const isPressed = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const start = useSharedValue({x: 0, y: 0});
  const current = useSharedValue({x: 0, y: 0});
  const final = useSharedValue({x: 0, y: 0});

  const [isLocked, setIsLocked] = useState(false);

  const validateProps = () => {
    if (shouldSnapBack && (!destinationPosition || !onPlaced)) {
      throw new Error(
        'If shouldSnapBack is true then destinationPosition and onPlaced is required',
      );
    }
    if (canCancel && !onCancel) {
      throw new Error('If canCel is true then onCancel is required');
    }
  };

  useEffect(() => {
    validateProps();
  }, [shouldSnapBack, destinationPosition, onPlaced, canCancel, onCancel]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offsetX.value},
        {translateY: offsetY.value},
        {scale: withSpring(isPressed.value ? 1.2 : 1)},
      ],
      backgroundColor: isPressed.value ? 'black' : 'blue',
    };
  });

  const onBallLayout = (e: LayoutChangeEvent) => {
    if (!destinationPosition) {
      return;
    }
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
      offsetX.value = e.translationX + start.value.x;
      offsetY.value = e.translationY + start.value.y;
    })
    .onEnd(e => {
      start.value = {
        x: offsetX.value,
        y: offsetY.value,
      };
      current.value.x = e.absoluteX;
      current.value.y = e.absoluteY;
    })
    .onFinalize(e => {
      isPressed.value = false;
      if (shouldSnapBack && destinationPosition) {
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
          offsetX.value = withTiming(final.value.x, {duration: 50});
          offsetY.value = withTiming(final.value.y, {duration: 50});
          start.value = {x: final.value.x, y: final.value.y};
          runOnJS(setIsLocked)(true);
          onPlaced && runOnJS(onPlaced)();
          return;
        }
        if (!isLocked) {
          offsetX.value = withTiming(0, {duration: 200});
          offsetY.value = withTiming(0, {duration: 200});
          start.value = {x: 0, y: 0};
        }
      }
    });

  const snapBack = () => {
    offsetX.value = withTiming(0, {duration: 200, easing: Easing.linear});
    offsetY.value = withTiming(0, {duration: 200, easing: Easing.linear});
    start.value = {x: 0, y: 0};
    setIsLocked(false);
    onCancel && onCancel();
  };

  return (
    <GestureDetector gesture={gesture.enabled(!isLocked)}>
      <Animated.View
        style={[styles.ball, animatedStyles]}
        onLayout={onBallLayout}
        entering={ZoomIn}>
        <Pressable onPress={snapBack} style={styles.ball} disabled={!canCancel}>
          <Text style={styles.text}>Landing Page</Text>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableBall;

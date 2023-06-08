import {FC, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {LayoutChangeEvent, Pressable, ViewStyle} from 'react-native';

import {useTheme} from '@rneui/themed';
import {isNullorUndefined} from '@utils/helpers';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';

import styles from './styles';

type DraggableBallCommonProps = {
  backgroundColor?: string;
  ballStyles?: ViewStyle;
  borderColor?: string;
  canCancel: boolean;
  children: ReactNode;
  destinationPosition?: {x: number; y: number};
  destinationRadius: number;
  onCancel?: () => void;
  onPlaced?: () => void;
  radius: number;
  shouldSnapBack: boolean;
  Yoffset?: number;
  nudge: boolean;
};

const DraggableBall: FC<DraggableBallCommonProps> = ({
  backgroundColor,
  borderColor,
  canCancel,
  children,
  destinationPosition,
  destinationRadius,
  onCancel,
  onPlaced,
  radius,
  shouldSnapBack,
  Yoffset,
  nudge,
}) => {
  const {theme} = useTheme();

  const isPressed = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0 + (Yoffset ?? 0));
  const start = useSharedValue({x: 0, y: 0 + (Yoffset ?? 0)});
  const current = useSharedValue({x: 0, y: 0});
  const final = useSharedValue({x: 0, y: 0});
  const nudgeControl = useSharedValue(0);

  const intervalControl = useRef<number>(0);

  const [isLocked, setIsLocked] = useState(false);
  const [ballPosition, setBallPosition] = useState({x: 0, y: 0});

  const dimensions: ViewStyle = useMemo(
    () => ({
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      backgroundColor: backgroundColor ?? theme.colors.secondary,
      borderColor: borderColor ?? theme.colors.warning,
      borderWidth: borderColor ? 1 : 0,
    }),
    [radius],
  );

  const validateProps = () => {
    if (
      shouldSnapBack &&
      (!destinationPosition || !onPlaced || isNullorUndefined(nudge))
    ) {
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
    };
  });

  const nudgeAnimationStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: final.value.x * nudgeControl.value},
      {translateY: final.value.y * nudgeControl.value},
    ],
  }));

  const onBallLayout = (e: LayoutChangeEvent) => {
    const {x, y} = e.nativeEvent.layout;
    setBallPosition({x, y});
  };

  useEffect(() => {
    if (destinationPosition) {
      const {x, y} = ballPosition;
      const translationX =
        destinationPosition.x - x + (destinationRadius - radius);
      const translationY =
        destinationPosition.y - y - destinationRadius - radius;
      final.value = {x: translationX, y: translationY};
    }
  }, [destinationPosition, ballPosition]);

  useEffect(() => {
    if (nudge) {
      intervalControl.current = setInterval(
        () =>
          (nudgeControl.value = withSequence(
            withTiming(0.1, {duration: 800}),
            withTiming(0, {duration: 800}),
          )),
        4000,
      );
    }
  }, []);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
      if (nudge) {
        runOnJS(clearInterval)(intervalControl.current);
      }
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
        const magnification = 1.5;
        const xParam = {
          min: destinationPosition.x - destinationRadius * magnification,
          max: destinationPosition.x + destinationRadius * magnification,
        };
        const yParam = {
          min: destinationPosition.y - destinationRadius * magnification,
          max: destinationPosition.y + destinationRadius * magnification,
        };
        const {absoluteX, absoluteY} = e;
        const xPos = absoluteX;
        const yPos = absoluteY;
        if (
          xParam.min <= xPos &&
          xPos <= xParam.max &&
          yParam.min <= yPos &&
          yPos <= yParam.max
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
          offsetY.value = withTiming(0 + (Yoffset ?? 0), {duration: 200});
          start.value = {x: 0, y: 0 + (Yoffset ?? 0)};
        }
      }
    });

  const snapBack = () => {
    offsetX.value = withTiming(0, {duration: 200, easing: Easing.linear});
    offsetY.value = withTiming(0 + (Yoffset ?? 0), {
      duration: 200,
      easing: Easing.linear,
    });
    start.value = {x: 0, y: 0};
    setIsLocked(false);
    onCancel && onCancel();
  };

  return (
    <GestureDetector gesture={gesture.enabled(!isLocked)}>
      <Animated.View
        style={[
          styles.ball,
          dimensions,
          nudge && nudgeAnimationStyle,
          animatedStyles,
        ]}
        onLayout={onBallLayout}
        entering={ZoomIn}>
        <Pressable onPress={snapBack} style={styles.ball} disabled={!canCancel}>
          {children}
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableBall;

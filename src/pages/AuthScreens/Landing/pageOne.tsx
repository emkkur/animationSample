import {FC, useEffect, useMemo} from 'react';
import {Pressable, View} from 'react-native';

import {Text, useTheme} from '@rneui/themed';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';

import getStyles from './styles';

type PageOneProps = {
  onPageChange: () => void;
  triggerAnimation: boolean;
};

const PageOne: FC<PageOneProps> = ({onPageChange, triggerAnimation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => getStyles(theme), []);

  const textOne = useSharedValue(0);
  const textTwo = useSharedValue(0);
  const buttonTransition = useSharedValue(0);
  const buttonState = useSharedValue(30);

  const firstSection = useAnimatedStyle(() => ({
    transform: [{translateX: interpolate(textOne.value, [0, 1], [50, 0])}],
    opacity: textOne.value,
  }));

  const secondSection = useAnimatedStyle(() => ({
    transform: [{translateX: interpolate(textTwo.value, [0, 1], [25, 0])}],
    opacity: textTwo.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    borderRadius: buttonState.value,
    transform: [
      {rotate: `${interpolate(buttonTransition.value, [0, 1], [180, 0])}deg`},
    ],
    opacity: buttonTransition.value,
  }));

  useEffect(() => {
    textOne.value = withTiming(triggerAnimation ? 1 : 0, {duration: 600});
    textTwo.value = withDelay(
      500,
      withTiming(triggerAnimation ? 1 : 0, {duration: 600}),
    );
    buttonTransition.value = withDelay(
      750,
      withTiming(triggerAnimation ? 1 : 0, {duration: 500}),
    );
  }, [triggerAnimation]);

  const onPressIn = () => {
    buttonState.value = withTiming(15, {duration: 100});
  };

  const onPressOut = () => {
    buttonState.value = withTiming(30, {duration: 100});
    onPageChange();
  };

  return (
    <View style={[styles.container]} key="Page 1">
      <Animated.View style={[styles.textContainer, firstSection]}>
        <Text style={styles.introText} h2>
          {'Welcome to a sample '}
        </Text>
      </Animated.View>
      <Animated.View style={secondSection}>
        <Text style={styles.embeddedText} h1>
          animation project
        </Text>
      </Animated.View>
      <Animated.View style={[styles.buttonContainer, buttonStyle]}>
        <Pressable
          onPressIn={onPressIn}
          style={styles.buttonStyle}
          onPressOut={onPressOut}>
          <Icon name="arrow-right" style={styles.iconStyles} />
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default PageOne;

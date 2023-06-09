import {FC, useMemo, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';

import DraggableBall from '@components/DraggableBall';
import {AuthParamProps} from '@navigation/AuthParamList';
import {Text, useTheme} from '@rneui/themed';
import Animated from 'react-native-reanimated';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

import getStyles from './styles';

const icons = ['google', 'facebook', 'apple', 'envelope'];
const offset = [0, -20, -20, 0];

const Login: FC<AuthParamProps<'Login'>> = () => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => getStyles(theme, insets), []);

  const [landingPosititon, setLandingPosition] = useState({x: 0, y: 0});

  const onLandingLayout = (e: LayoutChangeEvent) => {
    const {x, y} = e.nativeEvent.layout;
    console.log(x, y);
    setLandingPosition({x, y: y + 100});
  };

  const renderLoginMethods = () => {
    const onComplete = (method: string) => () => {};
    return icons.map((iconName, index) => (
      <DraggableBall
        canCancel
        destinationPosition={landingPosititon}
        destinationRadius={50}
        key={iconName}
        onCancel={onComplete(iconName)}
        onPlaced={onComplete(iconName)}
        radius={38}
        shouldSnapBack
        Yoffset={offset[index]}
        backgroundColor={theme.colors.primary}
        borderColor={theme.colors.warning}
        nudge={index === 0}>
        <Icon name={iconName} style={styles.iconStyles} />
      </DraggableBall>
    ));
  };

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.primary}}>
      <View style={styles.container}>
        <Animated.View style={[styles.titleContainer]}>
          <Text style={styles.titleStyle} h1>
            App Name
          </Text>
        </Animated.View>
        <View style={styles.iconContainer}>
          <View style={styles.landingZone} onLayout={onLandingLayout}>
            <Text style={styles.loginHintStyle}>Drag here to login</Text>
          </View>
          {renderLoginMethods()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

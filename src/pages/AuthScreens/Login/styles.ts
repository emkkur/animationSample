import {Dimensions, StyleSheet} from 'react-native';

import {ThemeType} from '@theme/theme';
import {EdgeInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('screen');

const getStyles = (theme: ThemeType, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconStyles: {
      fontSize: 23,
      color: theme.colors.warning,
    },
    landingZone: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderStyle: 'dotted',
      borderWidth: 2,
      borderColor: theme.colors.warning,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: height * 0.75 - 50,
      left: width / 2 - 50,
      zIndex: 0,
    },
    loginHintStyle: {
      fontSize: 16,
      color: theme.colors.secondary,
      textAlign: 'center',
    },
    iconContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: '3%',
      height: '100%',
    },
    titleContainer: {
      position: 'absolute',
      top: insets.top,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleStyle: {
      color: theme.colors.secondary,
    },
    animatedWebView: {
      backgroundColor: 'white',
      zIndex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 100,
      overflow: 'hidden',
      borderRadius: 25,
    },
    webView: {
      height: 100,
      width: 100,
    },
  });

export default getStyles;

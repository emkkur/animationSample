import {Dimensions, StyleSheet} from 'react-native';

import {ThemeType} from '@theme/theme';

const {height, width} = Dimensions.get('screen');

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height,
      backgroundColor: theme.colors.primary,
      overflow: 'hidden',
    },
    textContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: '400',
    },
    introText: {
      color: theme.colors.secondary,
    },
    embeddedText: {
      color: theme.colors.warning,
    },
    buttonContainer: {
      width: 60,
      height: 60,
      overflow: 'hidden',
      marginTop: 16,
    },
    buttonStyle: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.warning,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconStyles: {
      fontSize: 27,
      color: theme.colors.secondary,
    },
  });

export default getStyles;

import {StyleSheet} from 'react-native';

import {ThemeType} from '@theme/theme';

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      width: '100%',
      height: '100%',
    },
  });

export default getStyles;

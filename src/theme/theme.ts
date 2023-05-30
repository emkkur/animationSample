import {Theme} from '@rneui/base';
import {Colors, createTheme} from '@rneui/themed';

export type ThemeType = {
  colors: Colors;
} & Theme;

const theme = createTheme({
  components: {
    Text: {
      style: {
        fontFamily: 'OffBitTrial-Dot',
        fontSize: 18,
      },
      h1Style: {
        fontFamily: 'OffBitTrial-Dot',
      },
      h2Style: {
        fontFamily: 'OffBitTrial-Dot',
      },
      h3Style: {
        fontFamily: 'OffBitTrial-Dot',
      },
      h4Style: {
        fontFamily: 'OffBitTrial-Dot',
      },
    },
  },
  lightColors: {
    primary: '#000000',
    secondary: '#ffffff',
    warning: '#ff002e',
  },
  darkColors: {
    primary: '#000000',
    secondary: '#ffffff',
    warning: '#ff002e',
  },
});

export default theme;

import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
});

export default styles;

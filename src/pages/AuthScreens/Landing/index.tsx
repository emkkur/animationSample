import {View} from 'react-native';

import DraggableBall from '@components/DraggableBall';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './styles';

const Landing = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <DraggableBall shouldSnapBack destinationPosition={{x: 5, y: 5}} />
      </View>
    </SafeAreaView>
  );
};

export default Landing;

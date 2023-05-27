import {StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AuthProvider} from './context/AuthContext';
import {StorageProvider} from './context/StorageContext';
import NavigationStack from './navigation';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StorageProvider>
        <AuthProvider>
          <GestureHandlerRootView style={styles.gesture}>
            <NavigationStack />
          </GestureHandlerRootView>
        </AuthProvider>
      </StorageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
});

export default App;

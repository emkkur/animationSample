import {StyleSheet} from 'react-native';

import {ThemeProvider} from '@rneui/themed';
import theme from '@theme/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AuthProvider} from './context/AuthContext';
import {StorageProvider} from './context/StorageContext';
import NavigationStack from './navigation';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StorageProvider>
          <AuthProvider>
            <GestureHandlerRootView style={styles.gesture}>
              <NavigationStack />
            </GestureHandlerRootView>
          </AuthProvider>
        </StorageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
});

export default App;

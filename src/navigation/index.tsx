import {StatusBar} from 'react-native';

import {useAuth} from '@context/AuthContext/index';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from '@rneui/themed';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

const NavigationStack = () => {
  const {userToken} = useAuth();
  const {theme} = useTheme();

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'dark-content' : 'light-content'}
      />
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationStack;

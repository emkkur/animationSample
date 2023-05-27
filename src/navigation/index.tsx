import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {useAuth} from '@context/AuthContext/index';

const NavigationStack = () => {
  const {userToken} = useAuth();

  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationStack;

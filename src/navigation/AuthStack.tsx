import Landing from '@pages/AuthScreens/Landing';
import Login from '@pages/AuthScreens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthParamList} from './AuthParamList';

const AuthStackNavigator = createNativeStackNavigator<AuthParamList>();

const {Navigator, Screen} = AuthStackNavigator;

const AuthStack = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen component={Landing} name="Landing" />
      <Screen component={Login} name="Login" />
    </Navigator>
  );
};

export default AuthStack;

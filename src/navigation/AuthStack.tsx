import Landing from '@pages/AuthScreens/Landing';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthParamList} from './AuthParamList';

const AuthStackNavigator = createNativeStackNavigator<AuthParamList>();

const {Navigator, Screen} = AuthStackNavigator;

const AuthStack = () => {
  return (
    <Navigator>
      <Screen
        component={Landing}
        name="Landing"
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default AuthStack;

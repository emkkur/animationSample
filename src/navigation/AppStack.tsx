import Home from '@pages/AppScreens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppParamList} from './AppParamList';

const AppNativeStack = createNativeStackNavigator<AppParamList>();
const {Navigator, Screen} = AppNativeStack;

const AppStack = () => {
  return (
    <Navigator>
      <Screen component={Home} name="Home" />
    </Navigator>
  );
};

export default AppStack;

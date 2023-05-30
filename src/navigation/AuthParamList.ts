import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AuthParamList = {
  Landing: undefined;
  Login: undefined;
};

export type AuthParamProps<RouteName extends keyof AuthParamList> =
  NativeStackScreenProps<AuthParamList, RouteName>;

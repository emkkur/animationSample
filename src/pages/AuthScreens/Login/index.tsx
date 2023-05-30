import {FC, useMemo} from 'react';
import {View} from 'react-native';

import DraggableBall from '@components/DraggableBall';
import {AuthParamProps} from '@navigation/AuthParamList';
import {useTheme} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';

import getStyles from './styles';

const Login: FC<AuthParamProps<'Login'>> = () => {
  const {theme} = useTheme();
  const styles = useMemo(() => getStyles(theme), []);
  return (
    <SafeAreaView style={{backgroundColor: theme.colors.primary}}>
      <View style={styles.container}>
        <DraggableBall shouldSnapBack={false} canCancel={false} />
      </View>
    </SafeAreaView>
  );
};

export default Login;

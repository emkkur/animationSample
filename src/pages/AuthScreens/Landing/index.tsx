import {FC, useRef, useState} from 'react';
import {FlatList} from 'react-native';

import {AuthParamProps} from '@navigation/AuthParamList';
import {useTheme} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';

import PageOne from './pageOne';
import PageTwo from './pageTwo';

const Landing: FC<AuthParamProps<'Landing'>> = ({navigation}) => {
  const {theme} = useTheme();
  const flatlistRef = useRef<FlatList>(null);

  const [pageIndex, setPageIndex] = useState(0);

  const onPageForward = () => {
    if (pageIndex === 1) {
      navigation.navigate('Login');
      flatlistRef.current?.scrollToIndex({index: 0});
      setPageIndex(0);
      return;
    }
    flatlistRef.current?.scrollToIndex({animated: true, index: pageIndex + 1});
    setPageIndex(state => state + 1);
  };

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.primary}}>
      <FlatList
        ref={flatlistRef}
        data={[
          <PageOne
            onPageChange={onPageForward}
            triggerAnimation={pageIndex === 0}
            key={0}
          />,
          <PageTwo
            onPageChange={onPageForward}
            triggerAnimation={pageIndex === 1}
            key={1}
          />,
        ]}
        renderItem={({item}) => item}
        horizontal
        pagingEnabled
        removeClippedSubviews
        scrollEnabled={false}
      />
    </SafeAreaView>
  );
};

export default Landing;

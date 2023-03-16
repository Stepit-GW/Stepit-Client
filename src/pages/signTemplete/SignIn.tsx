import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {PINK3, TOP_MARGIN} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import Title from '@/components/Title';
import Btn from '@/components/Btn';

export default function SignIn({navigation}: any): JSX.Element {
  return (
    <SafeAreaView style={[commonStyles.container]}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <Title text="로그인" />
        <Btn
          Fn={() => {
            // 토큰 가져오기
            navigation.popToTop();
            navigation.reset({index: 0, routes: [{name: 'Home'}]});
          }}
          text="로그인"
          style={{}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBox: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

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

export default function SignUp({navigation}: any): JSX.Element {
  return (
    <SafeAreaView style={[commonStyles.container]}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <Title text="회원가입" />
        <Btn
          Fn={() => {
            navigation.navigate('Terms');
          }}
          text="회원가입"
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

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
import {PINK3} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import Title from '@/components/Title';
import Btn from '@/components/Btn';

export default function Terms({navigation}: any): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <Title text="회원가입" />
        <Btn
          Fn={() => {
            navigation.navigate('Profile');
          }}
          text="완료"
          style={{}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: PINK3,
  },

  logo: {
    width: 88,
    height: 144,
    marginBottom: 20,
  },
  logoTitle: {
    width: 92,
    height: 20,
    marginBottom: 200,
  },

  signup: {
    width: '100%',
    height: 48,
    marginBottom: 30,

    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  signupText: {
    textAlign: 'center',
  },
});

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
import {
  GRAY,
  PINK0,
  PINK3,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import Charbar1 from '@/components/home/Chatbar1';
import Charbar2 from '@/components/home/Charbar2';

export default function Login(): JSX.Element {
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={[commonStyles.container, {backgroundColor: PINK3}]}>
      <View
        style={[
          commonStyles.containerView,
          commonStyles.paddingHor,
          styles.container,
        ]}>
        <Image source={require('@/assets/logo.png')} style={styles.logo} />
        <Image
          source={require('@/assets/logo-title.png')}
          style={styles.logoTitle}
        />
        <Pressable style={styles.signup}>
          <Text style={styles.signupText}>회원가입</Text>
        </Pressable>
        <Text>이미 기프투 회원이라면? 로그인</Text>
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

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
import Charbar1 from '@/components/home/Chatbar1';
import Charbar2 from '@/components/home/Charbar2';
import Btn from '@/components/Btn';

export default function Logo({navigation}: any): JSX.Element {
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
        <Btn
          Fn={() => {
            navigation.navigate('SignUp');
          }}
          text="회원가입"
          style={{color: '#000', backgroundColor: '#fff'}}
        />
        <Text>
          이미 기프투 회원이라면?{' '}
          <Text
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            로그인
          </Text>
        </Text>
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

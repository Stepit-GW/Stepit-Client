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
import {commonStyles} from '@/styels/commonStyles';
import Title from '@/components/Title';
import Btn from '@/components/Btn';
import {BTN_HEIGHT, GRAY, WINDOW_HEIGHT} from '@/static/commonValue';

export default function SignUp({navigation}: any): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <Title text="회원가입" style={{marginBottom: WINDOW_HEIGHT / 12}} />
        <TextInput style={styles.input} placeholder="이메일" />
        <TextInput style={styles.input} placeholder="비밀번호" />
        <Btn
          Fn={() => {
            navigation.navigate('Terms');
          }}
          text="회원가입"
          style={{}}
        />
        <View style={styles.hrBox}>
          <Text style={styles.orText}>or</Text>
          <View style={styles.hr} />
        </View>

        <Text style={styles.snsText}>SNS로 시작하기</Text>

        <Image
          source={require('@/assets/notfound.png')}
          style={styles.btnKakao}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: BTN_HEIGHT,
    marginBottom: 8,
    paddingHorizontal: 20,

    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 10,
  },

  hrBox: {
    height: 20,
    justifyContent: 'center',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
  },
  orText: {
    width: 30,
    height: 30,
    lineHeight: 30,

    color: '#555',
    position: 'absolute',

    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',

    backgroundColor: 'white',
    zIndex: 1,
  },

  snsText: {
    marginVertical: 20,
    color: '#555',
    textAlign: 'center',
  },

  btnKakao: {
    width: 42,
    height: 42,
    alignSelf: 'center',
    borderRadius: 42,
  },
});

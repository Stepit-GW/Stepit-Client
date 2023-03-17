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

export default function Terms({navigation}: any): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <Title text="회원가입" style={{marginBottom: WINDOW_HEIGHT / 12}} />

        <View style={styles.checkBox}>
          <Image
            source={require('@/assets/notfound.png')}
            style={styles.checkImg}
          />
          <Text style={styles.checkText}>약관 전체 동의</Text>
        </View>

        <View style={[styles.hr, {marginBottom: 27}]} />

        <View style={styles.checkBox}>
          <Image
            source={require('@/assets/notfound.png')}
            style={styles.checkImg}
          />
          <Text style={styles.checkText}>이용약관 동의(필수)</Text>
        </View>

        <View style={styles.checkBox}>
          <Image
            source={require('@/assets/notfound.png')}
            style={styles.checkImg}
          />
          <Text style={styles.checkText}>개인정보 수집 및 이용동의(필수)</Text>
        </View>

        <Btn
          Fn={() => {
            navigation.navigate('Profile');
          }}
          text="회원가입"
          style={{}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
  },

  checkBox: {
    marginBottom: 27,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkImg: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  checkText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

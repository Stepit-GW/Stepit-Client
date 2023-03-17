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

export default function Profile({navigation}: any): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <Title text="프로필" style={{}} />

        <View style={styles.profileImgBox}>
          <Image
            source={require('@/assets/notfound.png')}
            style={styles.profileImg}
          />
          <Image
            source={require('@/assets/notfound.png')}
            style={styles.profileImgRight}
          />
        </View>

        <View style={styles.input}>
          <Image
            source={require('@/assets/notfound.png')}
            style={styles.inputImg}
          />
          <TextInput style={styles.textInput} placeholder="이름" />
        </View>

        <View style={styles.input}>
          <Image
            source={require('@/assets/notfound.png')}
            style={styles.inputImg}
          />
          <TextInput style={styles.textInput} placeholder="instagram ID" />
        </View>

        <Btn
          Fn={() => {
            navigation.popToTop();
            navigation.reset({index: 0, routes: [{name: 'Home'}]});
          }}
          text="완료"
          style={{}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImgBox: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 40,

    overflow: 'hidden',
    alignSelf: 'center',
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: 120,
  },
  profileImgRight: {
    width: 30,
    height: 30,

    position: 'absolute',
    right: 5,
    bottom: 0,
    borderRadius: 30,
  },

  input: {
    height: BTN_HEIGHT,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',

    overflow: 'hidden',
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 10,
  },
  inputImg: {
    marginHorizontal: 10,
  },
  textInput: {
    width: '100%',
  },
});

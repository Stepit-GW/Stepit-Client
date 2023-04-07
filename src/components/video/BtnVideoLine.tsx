import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {useRecoilState, useRecoilValue} from 'recoil';
import {modalVideoState} from '@/recoil/modalVideoState';
import {MARGIN_HOR, MARGIN_VER, TOP_HEIGHT} from '@/static/commonValue';
import {useNavigation} from '@react-navigation/native';
import {windowState} from '@/recoil/windowState';
import BtnVideoMove from '@/components/video/BtnVideoMove';

export default function BtnVideoLine({}: any): JSX.Element {
  const navigation = useNavigation<any>();

  const window = useRecoilValue(windowState);

  useEffect(() => {
    // console.log(window.width);
  }, [window]);

  return (
    <View style={Styles(window.force).lineBox}>
      <View style={styles.line} />

      <View style={styles.realLineBox}>
        <View style={{width: '40%'}}>
          <View style={styles.realLine} />
        </View>
      </View>
      <View style={[styles.realLineBox, Styles(window.force).circleCheck]}>
        <View style={{width: '40%'}}>
          <View style={Styles(window.force).circle} />
        </View>
      </View>

      <View style={[styles.realLineBox, Styles(window.force).circleCheck]}>
        <Image
          source={require('@/assets/video/check-22.png')}
          style={[Styles(window.force).checks, {marginLeft: '20%'}]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,

    opacity: 1,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'white',
  },
  realLineBox: {
    width: '100%',
    paddingRight: 0,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  realLine: {
    borderWidth: 1,
    borderColor: 'red',
  },
});

const Styles = (ori: boolean) =>
  StyleSheet.create({
    lineBox: {
      width: '100%',
      height: ori ? 24 : 10,
      marginBottom: ori ? 10 : 0,
      flexDirection: 'row',
    },

    circle: {
      width: ori ? 14 : 10,
      height: ori ? 14 : 10,
      alignSelf: 'flex-end',
      borderRadius: ori ? 14 : 10,
      backgroundColor: 'red',
    },
    checks: {
      width: ori ? 22 : 10,
      height: ori ? 22 : 10,
    },
    circleCheck: {
      position: 'absolute',
      bottom: ori ? -10 : -3,
      zIndex: 999,
    },
  });

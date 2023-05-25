import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {useRecoilValue} from 'recoil';
import {MARGIN_HOR} from '@/static/commonValue';
import {windowState} from '@/recoil/windowState';

export default function BtnVideoSetting({
  rate,
  mirror,
  setMirror,
  rateShow,
  setRateShow,
  timeout,
  aniOpacityTimeFn,
}: any): JSX.Element {
  const window = useRecoilValue(windowState);

  return (
    <View style={Styles(window.force).bottomBox}>
      <Pressable
        style={styles.bottomBtn}
        onPress={() => {
          setMirror(!mirror);
        }}>
        <Image
          source={require('@/assets/video/mirror-mode-24.png')}
          style={{width: window.ipad ? 40 : 24, height: window.ipad ? 40 : 24}}
        />
        <Text style={styles.bottomText}>거울모드</Text>
      </Pressable>
      <Pressable
        style={styles.bottomBtn}
        onPress={() => {
          clearTimeout(timeout.timeoutId);
          aniOpacityTimeFn(1);
          const newTimeoutId = setTimeout(() => {
            aniOpacityTimeFn(0);
          }, 5000);
          timeout.setTimeoutId(newTimeoutId);
          setRateShow(!rateShow);
        }}>
        <Image
          source={require('@/assets/video/double-speed-24.png')}
          style={{width: window.ipad ? 40 : 24, height: window.ipad ? 40 : 24}}
        />
        <Text style={styles.bottomText}>배속({rate}x)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBtn: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    height: 25,
    marginLeft: 5,

    color: 'white',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 25,
  },
});

const Styles = (ori: boolean) =>
  StyleSheet.create({
    topBox: {
      height: 24,
      paddingHorizontal: ori ? 0 : MARGIN_HOR,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    bottomBox: {
      width: '100%',
      height: 25,
      marginVertical: 10,

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

      display: ori ? 'flex' : 'none',
    },
  });

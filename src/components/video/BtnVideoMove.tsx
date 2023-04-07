import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {windowState} from '@/recoil/windowState';

export default function BtnVideoMove({}: any): JSX.Element {
  const window = useRecoilValue(windowState);

  useEffect(() => {
    // console.log(window.width);
  }, [window]);

  return (
    <View style={Styles(window.orientation).lineBox}>
      <View style={Styles(window.orientation).circle} />
      <View style={[styles.line, {opacity: 0.3}]} />

      <View style={styles.realLineBox}>
        <View style={{width: '20%'}}>
          <View style={styles.realLine} />
        </View>
      </View>
      <View style={styles.realLineBox}>
        <Image
          source={require('@/assets/video/check-22.png')}
          style={[Styles(window.orientation).checks, {marginLeft: '20%'}]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,

    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  realLineBox: {
    width: '100%',
    paddingRight: 0,
    position: 'absolute',
    alignSelf: 'center',
  },
  realLine: {
    borderWidth: 1,
    borderColor: 'white',
  },
});

const Styles = (ori: boolean) =>
  StyleSheet.create({
    lineBox: {
      width: '100%',
      height: 24,
      marginBottom: ori ? 36 + 36 + 25 : 10,
      flexDirection: 'row',
    },
    circle: {
      width: ori ? 10 : 14,
      height: ori ? 10 : 14,
      alignSelf: 'center',
      borderRadius: ori ? 10 : 14,
      backgroundColor: 'white',
    },

    checks: {
      width: ori ? 10 : 22,
      height: ori ? 10 : 22,
    },
  });

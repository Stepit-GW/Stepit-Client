import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';
import {useRecoilValue} from 'recoil';
import {windowState} from '@/recoil/windowState';
import {WINDOW_WIDTH} from '@/static/commonValue';

export default function BtnVideoPlay(): JSX.Element {
  const window = useRecoilValue(windowState);
  const videoHeight1 = window.force
    ? window.ipad
      ? window.height / 1.4
      : window.height / 1.8
    : window.ipad
    ? ((WINDOW_WIDTH / 3) * 2) / 1.2
    : ((WINDOW_WIDTH / 3) * 2) / 1.6;

  return (
    <View style={Styles(videoHeight1, window.force).topBox}>
      <View />
      <Pressable
        onPress={() => {
          console.log('play');
        }}>
        <Image
          source={require('@/assets/video/start-24.png')}
          style={{width: window.ipad ? 40 : 24, height: window.ipad ? 40 : 24}}
        />
      </Pressable>
      <View />
    </View>
  );
}

const Styles = (height: number, ori: boolean) =>
  StyleSheet.create({
    topBox: {
      width: '100%',
      height: height,
      paddingHorizontal: ori ? 0 : 10,

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      //   backgroundColor: 'red',
    },
  });

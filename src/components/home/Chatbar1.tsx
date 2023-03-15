import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {GRAY, SCREEN_HEIGHT} from '@/static/commonValue';

export default function Charbar1({time}: any): JSX.Element {
  const aniTop = useRef<Animated.Value>(
    new Animated.Value(SCREEN_HEIGHT / 6),
  ).current;
  const aniOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniCharbarFn = (t: number, o: number) => {
    Animated.timing(aniTop, {
      toValue: t,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniOpacity, {
      toValue: o,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      aniCharbarFn(SCREEN_HEIGHT / 15, 1);
    }, time);
  }, []);

  return (
    <>
      <View style={styles.fixProfile1} />
      <Animated.Image
        source={require('@/assets/home-chatbar1.png')}
        style={[styles.fixChatbar1, {top: aniTop, opacity: aniOpacity}]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fixProfile1: {
    width: 100,
    height: 100,

    position: 'absolute',
    top: SCREEN_HEIGHT / 9,
    left: -25,
    borderRadius: 50,
    backgroundColor: GRAY,
  },
  fixChatbar1: {
    width: 220,
    height: 50,

    position: 'absolute',
    // top: SCREEN_HEIGHT / 18, // 15
    left: 50,
  },
});

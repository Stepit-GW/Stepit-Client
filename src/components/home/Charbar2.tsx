import React, {useEffect, useRef} from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';
import {GRAY, WINDOW_HEIGHT} from '@/static/commonValue';

export default function Charbar2({time}: any): JSX.Element {
  const aniTop = useRef<Animated.Value>(
    new Animated.Value(WINDOW_HEIGHT / 8),
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
      aniCharbarFn(0, 1);
    }, time);
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        right: 0,
        top: aniTop,
        opacity: aniOpacity,
      }}>
      <Image
        source={require('@/assets/notfound.png')}
        style={styles.fixProfile2}
      />
      <Image
        source={require('@/assets/home-chatbar2.png')}
        style={[styles.fixChatbar2, {top: WINDOW_HEIGHT / 4.3}]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fixProfile2: {
    width: 80,
    height: 80,

    position: 'absolute',
    top: WINDOW_HEIGHT / 3.5,
    right: -30,
    borderRadius: 50,
    backgroundColor: GRAY,
  },
  fixChatbar2: {
    width: 220,
    height: 50,

    position: 'absolute',
    // top: WINDOW_HEIGHT / 4.3, // 3
    right: 40,
  },
});

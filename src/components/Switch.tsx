import React, {useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';

export default function Switch({
  idx,
  switchDatas,
  setSwitchDatas,
}: any): JSX.Element {
  const aniLeft = useRef<Animated.Value>(new Animated.Value(2)).current;
  const aniOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniToggle = (l: number, o: number) => {
    Animated.timing(aniLeft, {
      toValue: l,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniOpacity, {
      toValue: o,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      style={styles.switchWrap}
      onPress={() => {
        let lst = switchDatas;
        lst[idx].tf = !switchDatas[idx].tf;
        if (lst[idx].tf) aniToggle(15, 1);
        else aniToggle(2, 0);
        setSwitchDatas(lst);
      }}>
      <Animated.View style={[styles.switchBg, {opacity: aniOpacity}]} />
      <Animated.View style={[styles.switch, {left: aniLeft}]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switchWrap: {
    width: 26,
    height: 13,

    position: 'relative',
    overflow: 'hidden',

    borderRadius: 50,
    backgroundColor: '#999',
  },
  switchBg: {
    width: 26,
    height: 13,
    position: 'absolute',
    top: 0,
    opacity: 0,
    backgroundColor: '#000',
  },
  switch: {
    width: 9,
    height: 9,

    position: 'absolute',
    top: 2,
    left: 2,

    borderRadius: 50,
    backgroundColor: '#fff',
  },
});

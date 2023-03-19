import {GRAY} from '@/static/commonValue';
import React, {useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';

export default function Switch(props: any): JSX.Element {
  const aniLeft = useRef<Animated.Value>(new Animated.Value(2)).current;
  const aniOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniToggle = (l: number, o: number) => {
    Animated.timing(aniLeft, {
      toValue: l,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniOpacity, {
      toValue: o,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      style={styles.switchWrap}
      onPress={() => {
        let lst = props.isEnabled;
        lst[props.idx] = !props.isEnabled[props.idx];
        if (lst[props.idx]) aniToggle(22, 1);
        else aniToggle(2, 0);
        console.log(props.isEnabled[props.idx]);
        props.setIsEnabled(lst);
      }}>
      <Animated.View style={[styles.switchBg, {opacity: aniOpacity}]} />
      <Animated.View style={[styles.switch, {left: aniLeft}]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switchWrap: {
    width: 50,
    height: 30,

    position: 'relative',
    overflow: 'hidden',

    borderRadius: 50,
    backgroundColor: GRAY,
  },
  switchBg: {
    width: 50,
    height: 30,
    position: 'absolute',
    top: 0,
    opacity: 0,
    backgroundColor: '#6C6C6C',
  },
  switch: {
    width: 26,
    height: 26,

    position: 'absolute',
    top: 2,
    left: 2,

    borderRadius: 50,
    backgroundColor: 'white',
  },
});

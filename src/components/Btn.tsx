import {PINK1} from '@/static/commonValue';
import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';

export default function Btn({Fn, text, style}: any): JSX.Element {
  return (
    <Pressable onPress={Fn} style={[styles.textBox, style]}>
      <Text style={[styles.text, style]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textBox: {
    width: '100%',
    height: 48,
    marginBottom: 36,

    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: PINK1,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
});

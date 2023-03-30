import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {TOP_HEIGHT} from '@/static/commonValue';

export default function Title({
  leftComponent,
  rightComponent,
  style,
}: any): JSX.Element {
  useEffect(() => {}, []);

  return (
    <View style={[styles.container, style]}>
      {leftComponent}
      <View />
      {rightComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: TOP_HEIGHT,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

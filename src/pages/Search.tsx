import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';

export default function Search(): JSX.Element {
  return (
    <>
      <Image source={require('@/assets/notfound.png')} style={styles.screen} />
      <Text>Search</Text>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
  },
});

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
import Title from '@/components/Title';
import {
  MARGIN_HOR,
  MARGIN_VER,
  TOP_HEIGHT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {homeDatas} from '@/static/home/homeDatas';
// import Video from 'react-native-video';

export default function BottomSheet({aniTop}: any): JSX.Element {
  return (
    <Animated.View
      style={{
        width: '100%',
        height: WINDOW_HEIGHT,
        position: 'absolute',
        top: aniTop,
        backgroundColor: 'white',
      }}></Animated.View>
  );
}

const styles = StyleSheet.create({});

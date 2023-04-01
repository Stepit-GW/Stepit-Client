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

export default function TitleAnimated({aniTopFn}: any): JSX.Element {
  const aniWidth = useRef<Animated.Value>(
    new Animated.Value(24 + MARGIN_HOR * 2),
  ).current;
  const aniWidth1 = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniWidth2 = useRef<Animated.Value>(new Animated.Value(48)).current;
  const aniLeft = useRef<Animated.Value>(
    new Animated.Value(MARGIN_HOR),
  ).current;
  const aniWidthFn = (w: number, w1: number, w2: number, l: number) => {
    Animated.timing(aniWidth, {
      toValue: w,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniWidth1, {
      toValue: w1,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniWidth2, {
      toValue: w2,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniLeft, {
      toValue: l,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.titleAbsoluteBox,
        {width: aniWidth, paddingHorizontal: MARGIN_HOR},
      ]}>
      <Pressable
        onPress={() => {
          aniWidthFn(24 + MARGIN_HOR * 2, 0, 48, MARGIN_HOR);
          aniTopFn(WINDOW_HEIGHT);
        }}>
        <Animated.Image
          source={require('@/assets/arrow-black-24.png')}
          style={{width: aniWidth1, height: 24}}
        />
      </Pressable>

      <Animated.View style={[styles.search, {left: aniLeft}]}>
        <Pressable
          onPress={() => {
            aniWidthFn(WINDOW_WIDTH, 24, 0, MARGIN_HOR + 24 + 10);
            aniTopFn(0);
          }}>
          <Animated.Image
            source={require('@/assets/search-24.png')}
            style={[commonStyles.img]}
          />
        </Pressable>
      </Animated.View>

      <Animated.View style={{width: aniWidth2}} />
      <TextInput
        style={[styles.input, {width: WINDOW_WIDTH - 48 - MARGIN_HOR}]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  titleAbsoluteBox: {
    height: TOP_HEIGHT,
    marginTop: MARGIN_VER,

    flexDirection: 'row',
    alignItems: 'center',

    position: 'absolute',
    right: 0,
    backgroundColor: 'white',
    zIndex: 901,
  },

  search: {
    position: 'absolute',
  },

  input: {
    height: 30,
    paddingLeft: 24 + 10,
    paddingRight: 10,

    borderWidth: 1,
    borderColor: '#CECECE',
    borderRadius: 88,
  },
});

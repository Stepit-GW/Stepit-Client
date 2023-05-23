import React, {useEffect, useRef, useState} from 'react';
import {Animated, Pressable, StyleSheet, TextInput} from 'react-native';
import {
  MARGIN_HOR,
  MARGIN_VER,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {searchDatas} from '@/static/searchDatas';
import {useRecoilState} from 'recoil';
import {windowState} from '@/recoil/windowState';
// import Video from 'react-native-video';

export default function TitleAnimated({
  aniTopFn,
  setResultDatas,
  aniOpacity,
}: any): JSX.Element {
  const [window] = useRecoilState(windowState);

  const aniWidth = useRef<Animated.Value>(
    new Animated.Value((window.ipad ? 40 : 24) + MARGIN_HOR * 2),
  ).current;
  const aniWidth1 = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniWidth2 = useRef<Animated.Value>(
    new Animated.Value((window.ipad ? 40 : 24) + 24),
  ).current;
  const aniLeft = useRef<Animated.Value>(
    new Animated.Value(MARGIN_HOR),
  ).current;
  const aniWidthFn = (w: number, w1: number, w2: number, l: number) => {
    Animated.timing(aniWidth, {
      toValue: w,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniWidth1, {
      toValue: w1,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniWidth2, {
      toValue: w2,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniLeft, {
      toValue: l,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const searchFn = (e: any) => {
    const word = e.nativeEvent.text;
    const res = searchDatas.filter((v: any) => {
      return v.keyword === word;
    });
    if (res.length !== 0) {
      setResultDatas(res[0].results);
      return;
    } else setResultDatas([]);
  };
  const [color, setColor] = useState(false);

  return (
    <Animated.View
      style={[
        Styles(window.ipad, color).titleAbsoluteBox,
        {width: aniWidth, paddingHorizontal: MARGIN_HOR, opacity: aniOpacity},
      ]}>
      <Pressable
        onPress={() => {
          aniWidthFn(
            (window.ipad ? 40 : 24) + MARGIN_HOR * 2,
            0,
            (window.ipad ? 40 : 24) + 24,
            MARGIN_HOR,
          );
          aniTopFn(WINDOW_HEIGHT);
          setColor(false);
        }}>
        <Animated.Image
          source={require('@/assets/arrow-black-24.png')}
          style={{width: aniWidth1, height: window.ipad ? 40 : 24}}
        />
      </Pressable>

      <Animated.View style={[styles.search, {left: aniLeft}]}>
        <Pressable
          onPress={() => {
            aniWidthFn(
              WINDOW_WIDTH,
              window.ipad ? 40 : 24,
              0,
              MARGIN_HOR + (window.ipad ? 40 : 24) + 10,
            );
            aniTopFn(0);
            setTimeout(() => {
              setColor(true);
            }, 400);
          }}>
          <Animated.Image
            source={{
              uri: color
                ? 'https://i.ibb.co/4T8GXJB/search-24.png'
                : 'https://i.ibb.co/L5rnNq4/search-white-24.png',
            }}
            style={[Styles(window.ipad, color).searchImg]}
          />
        </Pressable>
      </Animated.View>

      <Animated.View style={{width: aniWidth2}} />
      <TextInput
        style={[
          Styles(window.ipad, color).input,
          {width: WINDOW_WIDTH - ((window.ipad ? 40 : 24) + 24) - MARGIN_HOR},
        ]}
        placeholder={'걸그룹 명을 검색해 주세요'}
        onChange={searchFn}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    zIndex: 999,
  },
});

export const Styles = (ipad: boolean, color: boolean) =>
  StyleSheet.create({
    titleAbsoluteBox: {
      height: ipad ? 54 : 36,
      marginTop: MARGIN_VER * 2,

      flexDirection: 'row',
      alignItems: 'center',

      position: 'absolute',
      right: 0,
      zIndex: 901,
      backgroundColor: 'transparent',
    },
    searchImg: {
      width: ipad ? 40 : 24,
      height: ipad ? 40 : 24,
    },
    input: {
      height: '80%',
      paddingLeft: (ipad ? 40 : 24) + 10,
      paddingRight: 10,

      borderWidth: 1,
      borderColor: '#CECECE',
      borderRadius: 88,

      fontSize: ipad ? 18 : 12,
      backgroundColor: 'white',
    },
  });

import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
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
import {MARGIN_HOR, WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';
import {videoDetailDatas} from '@/static/videoDetail/videoDetailDatas';
import Accodian from '@/components/videoInfo/Accodian';
import LinearGradientVideo from '@/components/videoInfo/LinearGradientVideo';
import {windowState} from '@/recoil/windowState';
import {useRecoilState} from 'recoil';
import BtnVideoLine from '@/components/video/BtnVideoLine';
import BtnVideoTimeScale from '@/components/video/BtnVideoTimeScale';
import BtnVideoSetting from '@/components/video/BtnVideoSetting';
import BtnVideoTitle from '@/components/video/BtnVideoTitle';
import BtnVideoPlay from '@/components/video/BtnVideoPlay';

export default function VideoInfo(): JSX.Element {
  const [num, setNum] = useState(0);
  const reload = () => {
    setNum(num + 1);
  };
  const [window] = useRecoilState(windowState);
  const videoHeight1 = window.ipad
    ? (WINDOW_WIDTH / 4) * 3
    : (WINDOW_WIDTH / 10) * 11;
  const videoHeight2 = (WINDOW_WIDTH / 3) * 2;

  const aniVideoFnHeight = useRef<Animated.Value>(
    new Animated.Value(videoHeight1),
  ).current;
  const aniScrollHeight = useRef<Animated.Value>(
    new Animated.Value(WINDOW_HEIGHT - videoHeight1),
  ).current;
  const aniOpacity = useRef<Animated.Value>(new Animated.Value(1)).current;
  const aniOpacityT = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniVideoFn = (vh: number, sh: number, o: number, ot: number) => {
    Animated.timing(aniVideoFnHeight, {
      toValue: vh,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniScrollHeight, {
      toValue: sh,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniOpacity, {
      toValue: o,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniOpacityT, {
      toValue: ot,
      duration: 800,
      useNativeDriver: false,
    }).start();
    if (o === 1) setZIndex(true);
    else setZIndex(false);
  };
  const [zIndex, setZIndex] = useState(true);

  const aniScreenWidth = useRef<Animated.Value>(
    new Animated.Value(WINDOW_WIDTH),
  ).current;
  const aniScreenHeight = useRef<Animated.Value>(
    new Animated.Value(videoHeight2),
  ).current;
  const spinValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniScreenRotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
  const aniScreen = (vh: number, sh: number, r: number) => {
    Animated.timing(aniScreenWidth, {
      toValue: vh,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniScreenHeight, {
      toValue: sh,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(spinValue, {
      toValue: r,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const translateX = {
    translateX: -(WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
  };
  const translateY = {
    translateX: (WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
  };
  const rotate = {
    rotate: aniScreenRotate,
  };

  const startTop = WINDOW_HEIGHT - (WINDOW_WIDTH / 3) * 2;
  const [img, setImg] = useState(false);
  const aniTop = useRef<Animated.Value>(new Animated.Value(startTop)).current;
  const aniTopFn = (t: number, b: boolean) => {
    Animated.timing(aniTop, {
      toValue: t,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setImg(b);
  };

  const [preMove, setPreMove] = useState<number>(0);
  const [scrollH, setScrollH] = useState<number>(0);
  const [detailDatas, setDetailData] = useState<any>([]);
  useEffect(() => {
    setDetailData(videoDetailDatas);
  }, []);

  return (
    <>
      <Animated.View style={[{height: aniVideoFnHeight}]} />
      <Animated.View
        style={{
          width: '100%',
          height: aniVideoFnHeight,
          position: 'absolute',
          zIndex: 903,
        }}>
        <Animated.View
          style={[
            styles.videoInfo,
            {
              height: aniVideoFnHeight,
              opacity: aniOpacity,
              zIndex: zIndex ? 902 : 0,
            },
          ]}>
          <LinearGradientVideo />
        </Animated.View>
        <Animated.View
          style={[
            styles.videoInfo,
            {
              width: window.force ? window.width : '100%',
              height: window.force ? window.height : aniVideoFnHeight,
              justifyContent: 'flex-end',

              opacity: aniOpacityT,
              zIndex: zIndex ? 0 : 903,
              transform: [translateX, rotate, translateY],
            },
          ]}>
          <View style={Styles(window.ipad, window.force).bottom}>
            <BtnVideoPlay />
            <BtnVideoTimeScale aniScreen={aniScreen} />
            <BtnVideoLine />
            <BtnVideoSetting />
          </View>
        </Animated.View>
      </Animated.View>

      <BtnVideoTitle aniOpacityT={aniOpacityT} />

      <Animated.View
        style={[
          {
            width: aniScreenWidth,
            height: aniScreenHeight,
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: 'black',
            zIndex: 901,
            transform: [translateX, rotate, translateY],
          },
        ]}>
        <Animated.Image
          source={require('@/assets/notfound.png')}
          style={[
            commonStyles.screenImg,
            {
              width: window.force
                ? window.orientation
                  ? window.width
                  : (window.height / 2) * 3
                : '100%',
              height: window.force
                ? window.orientation
                  ? (window.width / 3) * 2
                  : window.height
                : aniVideoFnHeight,
            },
            window.force && {alignSelf: 'center'},
          ]}
        />
      </Animated.View>

      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.containerView}>
          <Animated.View
            style={{height: aniScrollHeight}}
            onTouchStart={e => {
              setPreMove(e.nativeEvent.pageY);
            }}
            onTouchMove={e => {
              const move = e.nativeEvent.pageY;
              if (preMove - move < 0 && scrollH <= 0) {
                aniVideoFn(videoHeight1, WINDOW_HEIGHT - videoHeight1, 1, 0);
                aniTopFn(startTop, true);
              }
            }}>
            <Animated.ScrollView
              style={[styles.scroll]}
              showsVerticalScrollIndicator={false}
              onScroll={(e: any) => {
                setScrollH(e.nativeEvent.contentOffset.y);
              }}>
              <View style={{height: 20}} />
              {detailDatas.map((data: any, idx: number) => {
                return (
                  <Accodian
                    key={idx}
                    idx={idx}
                    data={data}
                    detailDatas={detailDatas}
                    setDetailData={setDetailData}
                    aniVideoFn={aniVideoFn}
                    aniTopFn={aniTopFn}
                    reload={reload}
                  />
                );
              })}
              <View style={{height: 150}} />
            </Animated.ScrollView>
          </Animated.View>

          <Animated.View
            style={[
              styles.tutorial,
              {
                top: aniTop,
              },
            ]}>
            <View style={Styles(window.ipad, window.force).tutorialTitle}>
              <View />
              {img ? (
                <Pressable
                  onPress={() => {
                    aniTopFn(0, false);
                  }}>
                  <Image
                    source={require('@/assets/video/arrow-top-24.png')}
                    style={Styles(window.ipad, window.force).tutorialImg}
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    aniTopFn(startTop - 100, true);
                  }}>
                  <Image
                    source={require('@/assets/video/arrow-bottom-24.png')}
                    style={Styles(window.ipad, window.force).tutorialImg}
                  />
                </Pressable>
              )}
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  videoInfo: {
    position: 'absolute',
    top: 0,
  },
  containerTitle: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },

  scroll: {
    height: '100%',
    paddingHorizontal: MARGIN_HOR,
    backgroundColor: 'white',
  },

  tutorial: {
    width: '100%',
    height: WINDOW_HEIGHT,

    ...Platform.select({
      ios: {
        shadowColor: 'rgba(16, 24, 64, 0.5)',
        shadowOpacity: 0.3,
        shadowOffset: {
          height: -5,
          width: 0,
        },
      },
    }),

    position: 'absolute',
    backgroundColor: 'white',
    // backgroundColor: 'green',
  },
});

const Styles = (ipad: boolean, force: boolean) =>
  StyleSheet.create({
    bottom: {
      width: '100%',
      paddingHorizontal: force ? MARGIN_HOR * 3 : 0,

      position: 'absolute',
      bottom: 0,
    },

    tutorialTitle: {
      height: ipad ? 54 : 36,

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tutorialImg: {
      width: ipad ? 40 : 24,
      height: ipad ? 40 : 24,
      marginRight: MARGIN_HOR,
    },
  });

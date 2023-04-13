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
  videoHeight1,
  videoHeight2,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {useNavigation} from '@react-navigation/native';
import {videoDetailDatas} from '@/static/videoDetail/videoDetailDatas';
import Accodian from '@/components/videoInfo/Accodian';
import LinearGradientVideo from '@/components/videoInfo/LinearGradientVideo';
import {windowState} from '@/recoil/windowState';
import {useRecoilState, useRecoilValue} from 'recoil';
import BtnVideoLine from '@/components/video/BtnVideoLine';
import BtnVideoTimeScale from '@/components/video/BtnVideoTimeScale';
import BtnVideoSetting from '@/components/video/BtnVideoSetting';
import BtnVideoTitle from '@/components/video/BtnVideoTitle';

export default function VideoInfo(): JSX.Element {
  const [num, setNum] = useState(0);
  const reload = () => {
    setNum(num + 1);
  };
  const navigation = useNavigation<any>();
  const [window, setWindow] = useRecoilState(windowState);

  const aniVideoHeight = useRef<Animated.Value>(
    new Animated.Value(videoHeight1),
  ).current;
  const aniScrollHeight = useRef<Animated.Value>(
    new Animated.Value(WINDOW_HEIGHT - videoHeight1),
  ).current;
  const aniOpacity = useRef<Animated.Value>(new Animated.Value(1)).current;
  const aniOpacityT = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniVideo = (vh: number, sh: number, o: number, ot: number) => {
    Animated.timing(aniVideoHeight, {
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

  const [preMove, setPreMove] = useState<number>(0);
  const [scrollH, setScrollH] = useState<number>(0);
  const [detailDatas, setDetailData] = useState<any>([]);
  useEffect(() => {
    setDetailData(videoDetailDatas);
  }, []);

  return (
    <>
      <Animated.View style={[{height: aniVideoHeight}]} />
      <Animated.View
        style={{
          width: '100%',
          height: aniVideoHeight,
          position: 'absolute',
          zIndex: 903,
        }}>
        <Animated.View
          style={[
            styles.videoInfo,
            {
              height: aniVideoHeight,
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
              height: window.force ? window.height : aniVideoHeight,
              justifyContent: 'flex-end',
              opacity: aniOpacityT,
              zIndex: zIndex ? 0 : 903,
              transform: [translateX, rotate, translateY],
            },
          ]}>
          <View style={Styles(window.force).bottom}>
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
                : aniVideoHeight,
            },
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
              if (preMove - move < 0 && scrollH <= 0)
                aniVideo(videoHeight1, WINDOW_HEIGHT - videoHeight1, 1, 0);
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
                    aniVideo={aniVideo}
                    reload={reload}
                  />
                );
              })}
            </Animated.ScrollView>
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
});

const Styles = (force: boolean) =>
  StyleSheet.create({
    bottom: {
      width: '100%',
      paddingHorizontal: force ? MARGIN_HOR * 3 : 0,

      position: 'absolute',
      bottom: 0,
    },
  });

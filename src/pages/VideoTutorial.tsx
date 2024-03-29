import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {MARGIN_HOR, WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';

import {windowState} from '@/recoil/windowState';
import {useRecoilState} from 'recoil';
import {videoIdFilter} from '@/utils/videoFilter';

import BtnVideoLine from '@/components/video/BtnVideoLine';
import BtnVideoTimeScale from '@/components/video/BtnVideoTimeScale';
import BtnVideoSetting from '@/components/video/BtnVideoSetting';
import BtnVideoTitle from '@/components/video/BtnVideoTitle';
import BtnVideoPlay from '@/components/video/BtnVideoPlay';
import VideoScreen from '@/components/videoInfo/VideoScreen';

// import Voice from 'react-native-voice';

export default function VideoTutorial({route}: any): JSX.Element {
  const id = route.params.id;

  const videoRef = useRef<any>(null);
  const [window] = useRecoilState(windowState);
  const videoHeight = (WINDOW_WIDTH / 3) * 2;
  const btnOpacity = {opacity: window.force ? 0 : 1};
  const [timeoutId, setTimeoutId] = useState(-1);

  const [zIndex, setZIndex] = useState(true);

  const aniScreenWidth = useRef<Animated.Value>(
    new Animated.Value(WINDOW_WIDTH),
  ).current;
  const aniScreenHeight = useRef<Animated.Value>(
    new Animated.Value(videoHeight),
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
  const rotate = [
    {translateX: -(WINDOW_HEIGHT - WINDOW_WIDTH) / 2},
    {rotate: aniScreenRotate},
    {translateX: (WINDOW_HEIGHT - WINDOW_WIDTH) / 2},
  ];

  const [videoScreen, setVideoScreen] = useState<any>({
    kind: 'step',
    // url: 'https://www.dropbox.com/s/bhubemuj35zztwr/test.mp4?raw=1',
    testUrl: require('@/assets/notfound.mp4'),
  });

  const [rate, setRate] = useState<number>(1);
  const [rateShow, setRateShow] = useState<boolean>(false);
  const [mirror, setMirror] = useState<boolean>(false);
  const [videoPause, setVideoPause] = useState<any>(false);
  const [allTime, setAllTime] = useState<any>(0);
  const [currentTime, setCurrentTime] = useState<any>(0);
  const [videoData, setVideoData] = useState<any>({stage: []});

  const aniOpacityTime = useRef<Animated.Value>(new Animated.Value(1)).current;
  const aniOpacityTimeFn = (o: number) => {
    Animated.timing(aniOpacityTime, {
      toValue: o,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    const video = videoIdFilter({id: id});
    url: setVideoData(video);
    setVideoScreen(videoIdFilter({id: id, kind: 'detail'}));

    aniOpacityTimeFn(1);
    const newTimeoutId = setTimeout(() => {
      aniOpacityTimeFn(0);
    }, 5000);
    setTimeoutId(newTimeoutId);
  }, []);

  return (
    <>
      <Animated.View style={[{height: videoHeight}]} />
      <Animated.View
        style={{
          width: '100%',
          height: videoHeight,
          position: 'absolute',
          zIndex: 903,
        }}>
        <Animated.View
          style={[
            styles.videoInfo,
            {
              width: window.force ? window.width : '100%',
              height: window.force ? window.height : videoHeight,
              justifyContent: 'flex-end',

              zIndex: zIndex ? 0 : 903,
              transform: rotate,
              opacity: aniOpacityTime,
            },
          ]}>
          <Pressable
            style={Styles(window.ipad, window.force).bottom}
            onPress={() => {
              clearTimeout(timeoutId);
              aniOpacityTimeFn(1);
              const newTimeoutId = setTimeout(() => {
                aniOpacityTimeFn(0);
              }, 5000);
              setTimeoutId(newTimeoutId);
            }}>
            <BtnVideoPlay
              videoRef={videoRef}
              videoPause={videoPause}
              setVideoPause={setVideoPause}
              radioTime={Math.round(currentTime) / Math.round(allTime) === 1}
              timeout={{
                timeoutId,
                setTimeoutId,
              }}
              aniOpacityTimeFn={aniOpacityTimeFn}
            />
            <BtnVideoTimeScale
              aniScreen={aniScreen}
              moveTime={[
                String(Math.floor(currentTime / 60)).padStart(1, '0'),
                String(Math.round(currentTime % 60)).padStart(2, '0'),
              ]}
              fixTime={[
                String(Math.floor(allTime / 60)).padStart(1, '0'),
                String(Math.round(allTime % 60)).padStart(2, '0'),
              ]}
              rateShow={rateShow}
              aniOpacityTimeFn={aniOpacityTimeFn}
            />
            <BtnVideoLine
              videoRef={videoRef}
              setVideoPause={setVideoPause}
              currentTime={Math.round(currentTime)}
              allTime={Math.round(allTime)}
              stopTime={undefined}
              rate={rate}
              setRate={setRate}
              rateShow={rateShow}
              timeout={{
                timeoutId,
                setTimeoutId,
              }}
              aniOpacityTimeFn={aniOpacityTimeFn}
            />
            <BtnVideoSetting
              rate={rate}
              mirror={mirror}
              setMirror={setMirror}
              rateShow={rateShow}
              setRateShow={setRateShow}
              timeout={{
                timeoutId,
                setTimeoutId,
              }}
              aniOpacityTimeFn={aniOpacityTimeFn}
            />
          </Pressable>
        </Animated.View>
      </Animated.View>

      <BtnVideoTitle
        title={videoScreen.title}
        aniOpacityT={1}
        _Speech={() => {}}
        videoStageTf={[]}
        setVideoStageTf={() => {}}>
        {!window.force && (
          <>
            <Pressable
              style={[btnOpacity, {marginRight: 8}]}
              onPress={() => {
                setMirror(!mirror);
              }}>
              <Image
                source={require('@/assets/video/mirror-mode-24.png')}
                style={Styles(window.ipad, true).img}
              />
            </Pressable>
            <Pressable
              style={btnOpacity}
              onPress={() => {
                clearTimeout(timeoutId);
                aniOpacityTimeFn(1);
                const newTimeoutId = setTimeout(() => {
                  aniOpacityTimeFn(0);
                }, 5000);
                setTimeoutId(newTimeoutId);
                setRateShow(!rateShow);
              }}>
              <Image
                source={require('@/assets/video/double-speed-24.png')}
                style={[Styles(window.ipad, true).img, {marginRight: 0}]}
              />
            </Pressable>
          </>
        )}
      </BtnVideoTitle>

      <VideoScreen
        rate={rate}
        mirror={mirror}
        videoRef={videoRef}
        videoPause={videoPause}
        setVideoPause={setVideoPause}
        setCurrentTime={setCurrentTime}
        setAllTime={setAllTime}
        stopTime={undefined}
        videoScreen={videoScreen}
        aniScreenWidth={aniScreenWidth}
        aniScreenHeight={aniScreenHeight}
        rotate={rotate}
        aniVideoFnHeight={videoHeight}
        _Voice={() => {}}
      />

      <SafeAreaView style={commonStyles.container}></SafeAreaView>
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
  tutorialList: {
    width: '100%',
    height: WINDOW_HEIGHT,
    paddingHorizontal: MARGIN_HOR,
    backgroundColor: 'white',
  },
});

const Styles = (ipad: boolean, force: boolean) =>
  StyleSheet.create({
    bottom: {
      width: '100%',
      paddingHorizontal: force ? MARGIN_HOR * 3 : MARGIN_HOR,

      position: 'absolute',
      // bottom: 15,
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

    img: {
      width: ipad ? 40 : 24,
      height: ipad ? 40 : 24,
      marginRight: ipad ? 10 : 5,
    },
  });

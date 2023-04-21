import React, {useEffect, useRef, useState} from 'react';
import {Animated, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {MARGIN_HOR, WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';

import {windowState} from '@/recoil/windowState';
import {useRecoilState} from 'recoil';
import {videoIdFilter} from '@/utils/videoFilter';

import BtnVideoLine from '@/components/video/BtnVideoLine';
import BtncurrentTimeScale from '@/components/video/BtnVideoTimeScale';
import BtnVideoSetting from '@/components/video/BtnVideoSetting';
import BtnVideoTitle from '@/components/video/BtnVideoTitle';
import BtnVideoPlay from '@/components/video/BtnVideoPlay';
import VideoScreen from '@/components/videoInfo/VideoScreen';

export default function VideoTutorial({route}: any): JSX.Element {
  const id = route.params.id;

  const videoRef = useRef<any>(null);
  const [window] = useRecoilState(windowState);
  const videoHeight = (WINDOW_WIDTH / 3) * 2;

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
    url: 'https://www.dropbox.com/s/bhubemuj35zztwr/test.mp4?raw=1',
  });

  const [videoPause, setVideoPause] = useState<any>(false);
  const [allTime, setAllTime] = useState<any>(0);
  const [currentTime, setCurrentTime] = useState<any>(0);
  const [videoData, setVideoData] = useState<any>({stage: []});
  useEffect(() => {
    const video = videoIdFilter(id, (res: any) => {
      setVideoScreen(res);
      setVideoPause(false);
    })[0];
    url: setVideoData(video);
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
            },
          ]}>
          <View style={Styles(window.ipad, window.force).bottom}>
            <BtnVideoPlay
              videoRef={videoRef}
              videoPause={videoPause}
              setVideoPause={setVideoPause}
              radioTime={Math.round(currentTime) / Math.round(allTime) === 1}
            />
            <BtncurrentTimeScale
              aniScreen={aniScreen}
              moveTime={[
                String(Math.floor(currentTime / 60)).padStart(1, '0'),
                String(Math.round(currentTime % 60)).padStart(2, '0'),
              ]}
              fixTime={[
                String(Math.floor(allTime / 60)).padStart(1, '0'),
                String(Math.round(allTime % 60)).padStart(2, '0'),
              ]}
            />
            <BtnVideoLine
              videoRef={videoRef}
              setVideoPause={setVideoPause}
              currentTime={Math.round(currentTime)}
              allTime={Math.round(allTime)}
              stopTime={undefined}
            />
            <BtnVideoSetting />
          </View>
        </Animated.View>
      </Animated.View>

      <BtnVideoTitle aniOpacityT={1} _onSpeechEnd={() => {}} />

      <VideoScreen
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
        _onRecordVoice={() => {}}
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

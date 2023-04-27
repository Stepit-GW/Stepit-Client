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
import {MARGIN_HOR, WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';
import LinearGradientVideo from '@/components/videoInfo/LinearGradientVideo';
import {windowState} from '@/recoil/windowState';
import {useRecoilState} from 'recoil';
import BtnVideoLine from '@/components/video/BtnVideoLine';
import BtncurrentTimeScale from '@/components/video/BtnVideoTimeScale';
import BtnVideoSetting from '@/components/video/BtnVideoSetting';
import BtnVideoTitle from '@/components/video/BtnVideoTitle';
import BtnVideoPlay from '@/components/video/BtnVideoPlay';
import Tutorial from '@/components/videoInfo/Tutorial';
import {videoDetailFilter, videoIdFilter} from '@/utils/videoFilter';
import Accodian from '@/components/videoInfo/Accodian';
import VideoScreen from '@/components/videoInfo/VideoScreen';

import Voice from 'react-native-voice';

export default function VideoInfo({route}: any): JSX.Element {
  const id = route.params.id;
  const shortId = route.params.shortId;
  const [num, setNum] = useState(0);
  const reload = () => {
    setNum(num + 1);
  };
  const videoRef = useRef<any>(null);
  const [window] = useRecoilState(windowState);
  const videoHeight1 = window.ipad
    ? (WINDOW_WIDTH / 4) * 3
    : (WINDOW_WIDTH / 10) * 11;
  const videoHeight2 = (WINDOW_WIDTH / 3) * 2;
  const btnOpacity = {opacity: window.force ? 0 : 1};

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
  const rotate = [
    {translateX: -(WINDOW_HEIGHT - WINDOW_WIDTH) / 2},
    {rotate: aniScreenRotate},
    {translateX: (WINDOW_HEIGHT - WINDOW_WIDTH) / 2},
  ];

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

  const [videoScreen, setVideoScreen] = useState<any>({
    kind: 'Step',
    url: 'https://www.dropbox.com/s/bhubemuj35zztwr/test.mp4?raw=1',
    testUrl: require('@/assets/notfound.mp4'),
  });

  // 0.25 0.5 0.75 1.0 1.25 1.5 1.75 2.0
  const [rate, setRate] = useState<number>(1);
  const [rateShow, setRateShow] = useState<boolean>(false);
  const [mirror, setMirror] = useState<boolean>(false);
  const [videoPause, setVideoPause] = useState<any>(false);
  const [allTime, setAllTime] = useState<any>(0);
  const [currentTime, setCurrentTime] = useState<any>(0);
  const [stopTime, setStopTime] = useState<any>(undefined);
  const [videoData, setVideoData] = useState<any>({stage: []});
  const [videoStageTf, setVideoStageTf] = useState<any>([]);
  const [videoStopTimeTf, setVideoStopTimeTf] = useState<any>([]);
  useEffect(() => {
    const video = videoDetailFilter(id, (res: any) => {});
    url: setVideoData(video);
    setVideoScreen(videoIdFilter(video));

    let videoStageTf = [];
    let videoStopTimeTf = [];
    for (let i = 0; i < video.stage.length; i++) {
      videoStageTf.push(false);
      const videoStopTime = video.stage[i].videoDetails[0].stopTime;
      if (videoStopTime !== undefined)
        for (let j = 0; j < videoStopTime.length; j++)
          videoStopTimeTf.push(false);
    }
    setVideoStageTf(videoStageTf);
    setVideoStopTimeTf(videoStopTimeTf);
  }, []);

  //record
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const _onSpeechStart = () => {
    console.log('_onSpeechStart');
    setText('');
  };
  const _onSpeechResults = (event: any) => {
    console.log('_onSpeechResults');
    const text = event.value[0].split(' ');
    console.log(text);
    if (
      text[text.length - 1] === '멈춰' ||
      text[text.length - 1] === '멍청' ||
      text[text.length - 1] === '정지'
    )
      setVideoPause(true);
    else if (
      text[text.length - 1] === '시작' ||
      text[text.length - 1] === '재생'
    )
      setVideoPause(false);
  };
  const _onSpeechError = (event: any) => {
    console.log(event.error);
  };
  const _onRecordVoice = () => {
    console.log('_Voice');
    Voice.start('ko-KR'); // en-US
    setIsRecord(true);
  };
  const _onSpeechEnd = () => {
    console.log('_onSpeechEnd');
    Voice.stop();
    setIsRecord(false);
  };

  useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
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
          <LinearGradientVideo title={videoScreen.title} />
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
              rateShow={rateShow}
            />
            <BtnVideoLine
              videoRef={videoRef}
              setVideoPause={setVideoPause}
              currentTime={Math.round(currentTime)}
              allTime={Math.round(allTime)}
              stopTime={stopTime}
              rate={rate}
              setRate={setRate}
              rateShow={rateShow}
            />
            <BtnVideoSetting
              rate={rate}
              mirror={mirror}
              setMirror={setMirror}
              rateShow={rateShow}
              setRateShow={setRateShow}
            />
          </View>
        </Animated.View>
      </Animated.View>

      <BtnVideoTitle
        title={videoScreen.title}
        aniOpacityT={aniOpacityT}
        _Speech={_onSpeechEnd}
        videoStageTf={videoStageTf}
        setVideoStageTf={setVideoStageTf}
        shortId={shortId}>
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
        stopTime={stopTime}
        videoScreen={videoScreen}
        aniScreenWidth={aniScreenWidth}
        aniScreenHeight={aniScreenHeight}
        rotate={rotate}
        aniVideoFnHeight={aniVideoFnHeight}
        _Voice={_onRecordVoice}
      />

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
                // const dummy = videoDetailFilter(id, (res: any) => {
                //   setVideoScreen(res);
                //   setVideoPause(false);
                // })[0];
                aniVideoFn(videoHeight1, WINDOW_HEIGHT - videoHeight1, 1, 0);
                aniTopFn(startTop, true);
                _onSpeechEnd();
              }
            }}>
            <Animated.ScrollView
              style={[styles.scroll]}
              showsVerticalScrollIndicator={false}
              onScroll={(e: any) => {
                setScrollH(e.nativeEvent.contentOffset.y);
              }}>
              <View style={{height: 20}} />
              {videoData.stage.map((data: any, idx: number) => {
                return (
                  <Accodian
                    key={idx}
                    idx={idx}
                    videoScreen={videoScreen}
                    setVideoScreen={setVideoScreen}
                    setVideoPause={setVideoPause}
                    setStopTime={setStopTime}
                    data={data}
                    videoStageTf={videoStageTf}
                    setVideoStageTf={setVideoStageTf}
                    aniVideoFn={aniVideoFn}
                    aniTopFn={aniTopFn}
                    reload={reload}
                  />
                );
              })}
              <View style={{height: 150, backgroundColor: 'white'}} />
            </Animated.ScrollView>
          </Animated.View>

          {/*  */}
          <Animated.View
            style={[
              styles.tutorial,
              {
                top: aniTop,
              },
            ]}>
            <Pressable
              style={Styles(window.ipad, window.force).tutorialTitle}
              onPress={() => {
                if (img) aniTopFn(0, false);
                else aniTopFn(startTop - 100, true);
              }}>
              <View
                style={{
                  width: 64,
                  height: 5,
                  borderRadius: 5,
                  backgroundColor: '#DCDCDC',
                }}
              />
              {/* <View />
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
                    source={require('@/assets/video/x-24.png')}
                    style={Styles(window.ipad, window.force).tutorialImg}
                  />
                </Pressable>
              )} */}
            </Pressable>
            <View style={styles.tutorialList}>
              {stopTime !== undefined &&
                stopTime.map((data: any, idx: number) => {
                  return (
                    <Tutorial
                      key={idx}
                      idx={idx}
                      data={data}
                      videoRef={videoRef}
                      videoStopTimeTf={videoStopTimeTf}
                      setVideoStopTimeTf={setVideoStopTimeTf}
                      setVideoScreen={setVideoScreen}
                      setVideoPause={setVideoPause}
                      currentTime={currentTime}
                      reload={reload}
                      _Voice={() => {
                        // _onRecordVoice();
                        // _onSpeechStart();
                      }}
                    />
                  );
                })}
              <View style={{height: WINDOW_HEIGHT, backgroundColor: 'white'}} />
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
      bottom: 15,
    },

    tutorialTitle: {
      height: ipad ? 54 : 36,

      flexDirection: 'row',
      justifyContent: 'center',
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

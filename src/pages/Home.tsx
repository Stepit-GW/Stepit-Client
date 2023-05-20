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
import {CommonStyles, commonStyles} from '@/styles/commonStyles';
import {
  MARGIN_HOR,
  MARGIN_VER,
  TOP_HEIGHT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import BottomSheet from '@/components/home/BottomSheet';
import TitleAnimated from '@/components/home/TitleAnimated';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {bottomBarState} from '@/recoil/bottomBarState';
import {windowState} from '@/recoil/windowState';
import {videoHomeDatas} from '@/static/videoDatas';
import {videoIdFilter} from '@/utils/videoFilter';
// import Video from 'react-native-video';

import {SliderBox} from 'react-native-image-slider-box';
import LinearGradient from 'react-native-linear-gradient';

export default function Home({navigation}: any): JSX.Element {
  const [window] = useRecoilState(windowState);

  const aniTop = useRef<Animated.Value>(
    new Animated.Value(WINDOW_HEIGHT),
  ).current;
  const aniTopFn = (t: number) => {
    Animated.timing(aniTop, {
      toValue: t,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const aniOpacity = useRef<Animated.Value>(new Animated.Value(1)).current;
  const aniOpacityFn = (o: number, time: number) => {
    Animated.timing(aniOpacity, {
      toValue: o,
      duration: time,
      useNativeDriver: false,
    }).start();
  };

  const [resultDatas, setResultDatas] = useState([]);
  const setBottomBar = useSetRecoilState(bottomBarState);

  const [videoDatas, setVideoDatas] = useState<any>(videoHomeDatas);
  useEffect(() => {
    const homeVideos = videoHomeDatas;
    for (let i = 0; i < homeVideos.length; i++) {
      const homeVideo = homeVideos[i].videos;
      for (let j = 0; j < homeVideo.length; j++)
        homeVideo[j] = videoIdFilter(homeVideo[j]);
    }
    setVideoDatas(homeVideos);
  }, []);

  const [scroll, setScroll] = useState<number>(0);
  const [dotStyle, setDotStyle] = useState<any>(0);

  return (
    <View
      style={commonStyles.container}
      onLayout={e => {
        setBottomBar(e.nativeEvent.layout.height);
      }}>
      <View style={commonStyles.containerView}>
        <Animated.View
          style={[Styles(window.ipad).titleBox, {opacity: aniOpacity}]}>
          <View style={commonStyles.img} />
          <Image
            style={Styles(window.ipad).title}
            source={require('@/assets/logo.png')}
          />
          <View style={commonStyles.img} />
        </Animated.View>
        <TitleAnimated
          aniTopFn={aniTopFn}
          setResultDatas={setResultDatas}
          aniOpacity={aniOpacity}
        />

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          // onTouchMove={e => {
          //   console.log(scroll);
          //   // const move = e.nativeEvent.pageY;
          //   // console.log(move);
          //   // console.log(move > WINDOW_HEIGHT * 0.5);
          //   // if (move > WINDOW_HEIGHT * 0.5) aniOpacityFn(1, 400);
          // }}
          onScroll={e => {
            const move = e.nativeEvent.contentOffset.y;
            // console.log(move);
            if (move <= 0) aniOpacityFn(1, 400);
            else aniOpacityFn(0, 400);
            setScroll(move);
          }}>
          <View style={styles.slider}>
            <SliderBox
              style={{width: '100%', height: '100%', opacity: 1}}
              images={[
                'https://i.ibb.co/LQrdzRx/Because-Of-You.png',
                'https://i.ibb.co/DYpWNSh/image.png',
                'https://i.ibb.co/LQrdzRx/Because-Of-You.png',
                'https://i.ibb.co/DYpWNSh/image.png',
              ]}
              currentImageEmitter={(idx: number) => {
                setDotStyle(idx);
              }}
              dotColor={'transparent'}
              inactiveDotColor={'transparent'}
              autoplay
              circleLoop
            />
            <LinearGradient
              colors={['transparent', 'transparent', 'white']}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                bottom: 0,
              }}>
              <Pressable
                style={{width: '100%', height: '100%'}}
                onTouchStart={e => {
                  // console.log(e.nativeEvent.pageX);
                }}
                onTouchEnd={e => {
                  // console.log(e.nativeEvent.pageX);
                }}
                onPress={() => {
                  console.log(dotStyle);
                }}
              />
            </LinearGradient>
          </View>
          <View
            style={{
              marginBottom: 18,
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            {[...Array(4)].map((data: any, idx: number) => {
              return (
                <View
                  key={idx}
                  style={{
                    width: 7,
                    height: 7,
                    marginHorizontal: 5,
                    borderRadius: 7,
                    backgroundColor: dotStyle === idx ? '#757575' : '#C7C7C7',
                  }}
                />
              );
            })}
          </View>

          {videoDatas.map((data: any, idx: number) => {
            return (
              <View key={idx} style={styles.scrollImgBox}>
                <Text style={Styles(window.ipad).scrollTitle}>
                  {data.title}
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{paddingLeft: MARGIN_HOR}}>
                  {data.videos.map((video: any, videoIdx: number) => {
                    return (
                      <Pressable
                        key={videoIdx}
                        style={[
                          Styles(window.ipad).videoBox,
                          {
                            marginRight:
                              videoIdx === data.videos.length - 1
                                ? window.ipad
                                  ? (WINDOW_WIDTH - 4 * 180 - 40) / 3
                                  : MARGIN_VER * 2 - 10
                                : window.ipad
                                ? (WINDOW_WIDTH - 4 * 180 - 40) / 3
                                : 10,
                          },
                        ]}
                        onPress={() => {
                          navigation.navigate('VideoInfo', {id: video.id});
                        }}>
                        {data.title === '기본기 뽀개뽀개' ? (
                          <Text
                            style={[
                              Styles(window.ipad).videoTitle,
                              {
                                height: '100%',
                                marginTop: 0,
                                paddingTop: window.ipad ? 110 : 95,
                                textAlign: 'center',
                              },
                            ]}>
                            {video.title}
                          </Text>
                        ) : (
                          <></>
                          // <Text style={Styles(window.ipad).videoTitle}>
                          //   {video.title}
                          // </Text>
                        )}
                        <View style={styles.videoBottom}>
                          {idx !== 0 && (
                            <Text style={Styles(window.ipad).videoLeft}>
                              {video.title === 'Because Of You'
                                ? 'Because...'
                                : video.title}
                            </Text>
                          )}
                          {video.level !== undefined && (
                            <View style={Styles(window.ipad).videoRightBox}>
                              <Text style={Styles(window.ipad).videoRight}>
                                {video.level}
                              </Text>
                            </View>
                          )}
                        </View>

                        <Image
                          source={{uri: video.imgUrl}}
                          style={[commonStyles.img100, {opacity: 0.8}]}
                        />
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            );
          })}
          <View style={{height: 34}} />
        </ScrollView>

        <BottomSheet aniTop={aniTop} resultDatas={resultDatas} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    // paddingTop: 34,
  },
  slider: {
    width: WINDOW_WIDTH,
    height: (WINDOW_WIDTH / 3) * 2,
    marginBottom: 18,
    backgroundColor: 'white',
  },
  scrollImgBox: {
    paddingBottom: 34,
  },

  videoBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'absolute',
    left: 3,
    bottom: 9,
    zIndex: 900,
  },

  fullScreen: {
    width: '100%',
    height: 300,
  },
});

const Styles = (ipad: boolean) =>
  StyleSheet.create({
    titleBox: {
      width: '100%',
      height: (ipad ? 54 : 36) + MARGIN_VER * 2,
      paddingTop: MARGIN_VER * 2,

      position: 'absolute',
      top: 0,

      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent',
      zIndex: 1,
    },
    title: {
      width: ipad ? 120 : 80,
      height: ipad ? 32 : 20,
    },

    scrollTitle: {
      marginLeft: MARGIN_VER,
      marginBottom: 20,

      color: 'black',
      fontSize: ipad ? 22 : 16,
      fontWeight: '700',
    },
    videoTitle: {
      width: '100%',
      marginTop: 7,
      paddingHorizontal: 10,

      position: 'absolute',
      top: 0,

      color: 'white',
      fontWeight: '800',
      fontSize: ipad ? 20 : 14,

      zIndex: 900,
    },
    videoRightBox: {
      width: ipad ? 30 : 20,
      height: ipad ? 30 : 20,
      marginRight: 14,

      justifyContent: 'center',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 20,
    },
    videoRight: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '500',
      fontSize: ipad ? 18 : 12,
    },
    videoLeft: {
      marginLeft: 6,
      color: 'white',
      fontWeight: '800',
      fontSize: ipad ? 24 : 18,
    },

    videoBox: {
      width: ipad ? 180 : 150,
      height: ipad ? 240 : 200,

      overflow: 'hidden',
      borderRadius: 15,
      backgroundColor: 'black',
    },
  });

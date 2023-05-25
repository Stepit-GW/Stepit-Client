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
import {
  bannerDatas,
  videoBannerDatas,
  videoHomeDatas,
} from '@/static/videoDatas';
import {videoIdFilter} from '@/utils/videoFilter';
import Video from 'react-native-video';

import LinearGradient from 'react-native-linear-gradient';
import {bannerState} from '@/recoil/bannerState';

const height1 = (WINDOW_WIDTH / 4) * 3;
const height2 = (WINDOW_WIDTH / 10) * 11;
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

  const [scroll, setScroll] = useState<number>(0);
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

  const [page, setPage] = useState(0);

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
          stickyHeaderIndices={[-1, -1]}
          onScroll={e => {
            const move = e.nativeEvent.contentOffset.y;
            if (move <= 0) aniOpacityFn(1, 120);
            else aniOpacityFn(0, 120);
            setScroll(move);
          }}>
          <View style={Styles(window.ipad).slider}>
            <ScrollView
              style={styles.screen}
              horizontal
              pagingEnabled
              scrollEventThrottle={200}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              onScroll={e => {
                const scroll = e.nativeEvent.contentOffset.x;
                setPage(scroll);
              }}>
              {videoBannerDatas.map((bannerId: number, bannerIdx: number) => {
                const videoRef = useRef<any>();
                const video = videoIdFilter({id: bannerId});

                return (
                  <Pressable
                    key={bannerIdx}
                    style={{
                      width: WINDOW_WIDTH,
                      height: '100%',
                      backgroundColor: 'black',
                    }}
                    onPress={() => {
                      navigation.navigate('VideoInfo', {
                        id: video.id,
                      });
                    }}>
                    <Video
                      ref={videoRef}
                      source={video.testUrl}
                      resizeMode={'cover'}
                      style={{
                        width: WINDOW_WIDTH,
                        height: '100%',
                        opacity: 0.8,
                        backgroundColor: 'black',
                      }}
                      repeat={true}
                      pause={false}
                      muted={false}
                      volume={0}
                    />
                  </Pressable>
                );
              })}
            </ScrollView>

            <LinearGradient
              colors={[
                // 'red',
                // 'rgba(255, 255, 255, 0)',
                'transparent',
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 1)',
              ]}
              style={{
                width: '100%',
                height: window.ipad ? '20%' : '25%',
                paddingHorizontal: MARGIN_HOR,
                position: 'absolute',
                bottom: 0,
              }}>
              <Text style={Styles(window.ipad).bannerTitle}>
                {
                  videoIdFilter({
                    id: videoBannerDatas[Math.round(page / WINDOW_WIDTH)],
                  }).title
                }
              </Text>
              <Text style={Styles(window.ipad).bannerSubTitle}>
                {
                  videoIdFilter({
                    id: videoBannerDatas[Math.round(page / WINDOW_WIDTH)],
                  }).subTitle
                }
              </Text>
            </LinearGradient>
            <View style={Styles(window.ipad).dotBox}>
              {[...Array(4)].map((data: any, idx: number) => {
                return (
                  <View
                    style={[
                      Styles(window.ipad).dot,
                      idx === Math.round(page / WINDOW_WIDTH) && {
                        backgroundColor: 'white',
                      },
                    ]}
                  />
                );
              })}
            </View>
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
                                  ? MARGIN_VER * 2 +
                                    10 -
                                    (WINDOW_WIDTH - 4 * 180 - 40) / 3
                                  : MARGIN_VER * 2 - 10
                                : window.ipad
                                ? (WINDOW_WIDTH - 4 * 180 - 40) / 3
                                : 10,
                          },
                        ]}
                        onPress={() => {
                          if (data.title === '기본기 뽀개뽀개')
                            navigation.navigate('VideoTutorial', {
                              id: video.id,
                            });
                          else navigation.navigate('VideoInfo', {id: video.id});
                        }}>
                        <View style={styles.videoBottom}>
                          <Text
                            style={[
                              Styles(window.ipad).videoLeft,
                              idx === 0 && {marginBottom: 4},
                            ]}>
                            {video.title}
                          </Text>
                          {video.level !== undefined && (
                            <View style={Styles(window.ipad).videoRightBox}>
                              <Text style={Styles(window.ipad).videoRight}>
                                {video.level}
                              </Text>
                            </View>
                          )}
                        </View>

                        <Image
                          source={{
                            uri:
                              idx === 2
                                ? 'https://i.ibb.co/XjBZvg0/Group-4038.png'
                                : video.imgUrl,
                          }}
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
  screen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  scroll: {
    // paddingTop: 34,
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
    bannerTitle: {
      marginBottom: 6,
      lineHeight: 36,
      color: 'white',
      fontWeight: '800',
      fontSize: ipad ? 30 : 26,
    },
    bannerSubTitle: {
      color: 'white',
      fontWeight: '600',
      fontSize: ipad ? 20 : 14,
    },

    slider: {
      width: WINDOW_WIDTH,
      height: ipad ? height1 : height2,
      // height: (WINDOW_WIDTH / 4) * 2.3,
      marginBottom: 18,
      backgroundColor: 'white',
    },

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
      width: ipad ? 24 : 20,
      height: ipad ? 24 : 20,
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
      fontSize: ipad ? 14 : 12,
    },
    videoLeft: {
      marginLeft: 10,
      color: 'white',
      fontWeight: '800',
      fontSize: ipad ? 16 : 14,
    },

    videoBox: {
      width: ipad ? 180 : 150,
      height: ipad ? 240 : 200,

      overflow: 'hidden',
      borderRadius: 15,
      backgroundColor: 'black',
    },

    dotBox: {
      width: WINDOW_WIDTH,
      paddingBottom: ipad ? 28 : 22,

      flexDirection: 'row',
      justifyContent: 'center',

      position: 'absolute',
      bottom: 0,
      zIndex: 999,
    },
    dot: {
      width: ipad ? 10 : 8,
      height: ipad ? 10 : 8,
      marginHorizontal: ipad ? 10 : 8,
      backgroundColor: 'rgba(250, 250, 250, 0.6)',
      borderRadius: 8,
    },
  });

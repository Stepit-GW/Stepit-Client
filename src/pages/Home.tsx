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
            if (move <= 0) aniOpacityFn(1, 100);
            else aniOpacityFn(0, 100);
            setScroll(move);
          }}>
          <View style={styles.slider}>
            <SliderBox
              style={{width: '100%', height: '100%', opacity: 1}}
              images={bannerDatas}
              onCurrentImagePressed={(idx: number) => {
                navigation.navigate('VideoInfo', {
                  id: videoBannerDatas[idx],
                });
              }}
              dotColor={'white'}
              inactiveDotColor={'rgba(0, 0, 0, 0.6)'}
              dotStyle={{
                width: window.ipad ? 10 : 7,
                height: window.ipad ? 10 : 7,
                marginBottom: window.ipad ? 24 : 12,
                borderRadius: 10,
              }}
              // autoplay
              // circleLoop
            />
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0)',
                // 'rgba(255, 255, 255, 0)',
                // 'rgba(255, 255, 255, 0)',
                // 'rgba(255, 255, 255, 0.1)',
                // 'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 1)',
              ]}
              style={{
                width: '100%',
                height: window.ipad ? '20%' : '25%',
                position: 'absolute',
                bottom: 0,
              }}
            />
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
                              idx === 0
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
  scroll: {
    // paddingTop: 34,
  },
  slider: {
    width: WINDOW_WIDTH,
    height: (WINDOW_WIDTH / 4) * 3,
    // height: (WINDOW_WIDTH / 4) * 2.3,
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
  });

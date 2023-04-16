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
import Title from '@/components/Title';
import {
  MARGIN_HOR,
  MARGIN_VER,
  TOP_HEIGHT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {homeDatas} from '@/static/home/homeDatas';
import BottomSheet from '@/components/home/BottomSheet';
import TitleAnimated from '@/components/home/TitleAnimated';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {bottomBarState} from '@/recoil/bottomBarState';
import {windowState} from '@/recoil/windowState';
// import Video from 'react-native-video';

export default function Home({navigation}: any): JSX.Element {
  const [window] = useRecoilState(windowState);

  const aniTop = useRef<Animated.Value>(
    new Animated.Value(WINDOW_HEIGHT),
  ).current;
  const aniTopFn = (t: number) => {
    Animated.timing(aniTop, {
      toValue: t,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const [resultDatas, setResultDatas] = useState([]);
  const setBottomBar = useSetRecoilState(bottomBarState);

  return (
    <SafeAreaView
      style={commonStyles.container}
      onLayout={e => {
        setBottomBar(e.nativeEvent.layout.height);
      }}>
      <View style={commonStyles.containerView}>
        <TitleAnimated aniTopFn={aniTopFn} setResultDatas={setResultDatas} />

        <View style={[commonStyles.paddingHor, Styles(window.ipad).titleBox]}>
          <View style={commonStyles.img} />
          <Text style={Styles(window.ipad).title}>STEPIT</Text>
          <View style={commonStyles.img} />
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {homeDatas.map((data: any, idx: number) => {
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
                                ? MARGIN_VER * 2 - 10
                                : 10,
                          },
                        ]}
                        onPress={() => {
                          navigation.navigate('VideoInfo');
                        }}>
                        <Text style={Styles(window.ipad).videoTitle}>
                          {video.title}
                        </Text>
                        <View style={styles.videoBottom}>
                          <View style={Styles(window.ipad).videoLeftBox}>
                            <Text style={Styles(window.ipad).videoLeft}>
                              {video.level}
                            </Text>
                          </View>
                          <Text style={Styles(window.ipad).videoRight}>
                            {video.time}
                          </Text>
                        </View>
                        <Image
                          source={require('@/assets/notfound.png')}
                          style={commonStyles.img100}
                        />
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>

        <BottomSheet aniTop={aniTop} resultDatas={resultDatas} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingTop: 34,
    marginBottom: 34,
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
    bottom: 5,
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
      height: ipad ? 54 : 36,
      marginTop: MARGIN_VER,

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: 'black',
      lineHeight: ipad ? 54 : 36,
      fontWeight: '700',
      fontSize: ipad ? 45 : 30,
    },

    scrollTitle: {
      marginLeft: MARGIN_VER,
      marginBottom: 20,

      color: 'black',
      fontSize: ipad ? 25 : 16,
      fontWeight: '700',
    },
    videoTitle: {
      width: '100%',
      marginTop: 10,
      paddingHorizontal: 6,

      position: 'absolute',
      top: 0,

      color: 'white',
      fontWeight: '800',
      fontSize: ipad ? 20 : 14,

      zIndex: 900,
    },
    videoLeftBox: {
      width: ipad ? 30 : 20,
      height: ipad ? 30 : 20,
      marginLeft: 6,

      justifyContent: 'center',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 20,
    },
    videoLeft: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '500',
      fontSize: ipad ? 18 : 12,
    },
    videoRight: {
      marginRight: 6,
      color: 'white',
      fontSize: ipad ? 18 : 12,
    },

    videoBox: {
      width: ipad ? 180 : 150,
      height: ipad ? 240 : 200,
      marginRight: 10,

      overflow: 'hidden',
      borderRadius: 15,
    },
  });

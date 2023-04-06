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
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {homeDatas} from '@/static/home/homeDatas';
import BottomSheet from '@/components/home/BottomSheet';
import TitleAnimated from '@/components/home/TitleAnimated';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {bottomBarState} from '@/recoil/bottomBarState';
// import Video from 'react-native-video';

export default function Home({navigation}: any): JSX.Element {
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

        <View style={[commonStyles.paddingHor, styles.titleBox]}>
          <View style={commonStyles.img} />
          <Text style={styles.title}>STEPIT</Text>
          <View style={commonStyles.img} />
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {homeDatas.map((data: any, idx: number) => {
            return (
              <View key={idx} style={styles.scrollImgBox}>
                <Text style={styles.scrollTitle}>{data.title}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {data.videos.map((video: any, videoIdx: number) => {
                    return (
                      <Pressable
                        key={videoIdx}
                        style={[
                          styles.videoBox,
                          {marginLeft: videoIdx === 0 ? MARGIN_VER : 0},
                        ]}
                        onPress={() => {
                          navigation.navigate('VideoInfo');
                        }}>
                        <Text style={styles.videoTitle}>{video.title}</Text>
                        <View style={styles.videoBottom}>
                          <Text style={styles.videoLeft}>{video.level}</Text>
                          <Text style={styles.videoRight}>{video.time}</Text>
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
  titleBox: {
    height: TOP_HEIGHT,
    marginTop: MARGIN_VER,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    lineHeight: 36,
    fontWeight: '700',
    fontSize: 30,
  },

  scroll: {
    paddingTop: 30,
  },
  scrollImgBox: {
    // marginLeft: MARGIN_VER,
    paddingBottom: 30,
  },
  scrollTitle: {
    marginLeft: MARGIN_VER,
    marginBottom: 20,
    lineHeight: 19,

    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },

  videoBox: {
    width: 125,
    height: 196,
    marginRight: MARGIN_VER,

    overflow: 'hidden',
    borderRadius: 15,
  },
  videoTitle: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 6,

    position: 'absolute',
    top: 0,

    color: 'white',
    // textAlign: 'center',
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 17,

    zIndex: 900,
    // backgroundColor: 'red',
  },
  videoBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'absolute',
    bottom: 5,

    zIndex: 900,
    // backgroundColor: 'red',
  },
  videoLeft: {
    width: 20,
    height: 20,
    marginLeft: 6,

    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',

    fontWeight: '500',
    fontSize: 12,

    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
  },
  videoRight: {
    marginRight: 6,
    color: 'white',
  },

  fullScreen: {
    width: '100%',
    height: 300,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});

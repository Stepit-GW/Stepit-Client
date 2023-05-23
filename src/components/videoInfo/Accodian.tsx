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
import {useNavigation} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';
import {useRecoilState} from 'recoil';
import {videoTutorialState} from '@/recoil/videoTutorialState';
import {videoIdFilter} from '@/utils/videoFilter';
// import Video from 'react-native-video';

export default function Accodian({
  idx,
  setCameraShow,
  videoScreen,
  setVideoScreen,
  setVideoPause,
  setStopTime,
  data,
  videoStageTf,
  setVideoStageTf,
  aniVideoFn,
  aniTopFn,
  reload,
  aniOpacityTimeFn,
}: any): JSX.Element {
  const [, setVideoTutorial] = useRecoilState(videoTutorialState);
  const videoHeight = (WINDOW_WIDTH / 3) * 2;

  const startTop = WINDOW_HEIGHT - (WINDOW_WIDTH / 3) * 2;

  const [height, setHeight] = useState(false);
  const aniHeight = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniHeightFn = (t: number) => {
    Animated.timing(aniHeight, {
      toValue: t,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      key={idx}
      style={styles.accodian}
      onPress={() => {
        let lst = videoStageTf;
        lst[idx] = !videoStageTf[idx];
        if (lst[idx]) {
          setHeight(true);
          aniHeightFn(data.videoDetails.length * 76 + 10);
        } else {
          aniHeightFn(0);
          setTimeout(() => {
            setHeight(false);
          }, 500);
        }
        setVideoStageTf(lst);
        reload();
      }}>
      <View
        style={[
          styles.boxName,
          {backgroundColor: videoStageTf[idx] ? '#EBEBEB' : '#FBFBFB'},
        ]}>
        <Text style={styles.step}>
          {videoScreen.kind}. {idx + 1}
        </Text>
        <View style={styles.contents}>
          <Text style={styles.title}>{data.stageTitle}</Text>
          {videoStageTf[idx] ? (
            <Image
              source={require('@/assets/video/arrow-top-24.png')}
              style={commonStyles.img}
            />
          ) : (
            <Image
              source={require('@/assets/video/arrow-bottom-24.png')}
              style={commonStyles.img}
            />
          )}
        </View>
      </View>

      <Animated.View
        style={{
          width: '100%',
          height: aniHeight,
        }}>
        {data.videoDetails.map((data2: any, idx2: number) => {
          return (
            <Pressable
              key={idx2}
              style={[styles.video, {display: height ? 'flex' : 'none'}]}
              onPress={() => {
                setCameraShow(false);
                // aniOpacityTimeFn(1);
                // setTimeout(() => {
                //   aniOpacityTimeFn(0);
                // }, 5000);
                if (data.stageTitle === '튜토리얼') {
                  setVideoTutorial(true);
                  aniTopFn(0, false);
                  setStopTime(data.videoDetails[0].stopTime);
                } else {
                  setVideoTutorial(false);
                  aniTopFn(startTop, true);
                  setStopTime(undefined);
                }
                aniVideoFn(videoHeight, WINDOW_HEIGHT - videoHeight, 0, 1);
                setVideoScreen(videoIdFilter(data2));
                setVideoPause(false);
                // const dummy = videoIdFilter(data2.id, (res: any) => {
                //   setVideoScreen(res);
                //   setVideoPause(false);
                // })[0];
              }}>
              <View style={styles.imgBox}>
                <Image
                  source={{uri: data2.imgUrl}}
                  style={commonStyles.img100}
                />
              </View>
              <View style={{marginLeft: 15}}>
                <Text>{data2.title}</Text>
                <Text>{data2.time}</Text>
              </View>
            </Pressable>
          );
        })}
      </Animated.View>
      <View style={{height: 18, backgroundColor: 'white'}} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  accodian: {
    width: '100%',
    // marginBottom: 10,
  },
  imgBox: {
    width: 100,
    height: 56,
    overflow: 'hidden',
    borderRadius: 5,
  },

  boxName: {
    width: '100%',
    height: 76,
    paddingHorizontal: 15,
    justifyContent: 'center',

    borderRadius: 10,
  },
  step: {
    marginBottom: 10,
    color: 'black',
    lineHeight: 19,
    fontSize: 16,
    fontWeight: '300',
  },
  contents: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    lineHeight: 19,
    fontSize: 18,
    fontWeight: '700',
  },

  video: {
    width: '100%',
    height: 76,
    paddingTop: 20,
    paddingHorizontal: 10,

    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  heartImg: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
});

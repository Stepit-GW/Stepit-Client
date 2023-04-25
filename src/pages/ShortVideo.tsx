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
import Video from 'react-native-video';
import {useRecoilValue} from 'recoil';

import {bottomBarState} from '@/recoil/bottomBarState';
import {WINDOW_HEIGHT} from '@/static/commonValue';
import {videoShortDatas} from '@/static/videoDatas';
import {commonStyles} from '@/styles/commonStyles';
import {videoIdFilter} from '@/utils/videoFilter';

export default function ShortVideo({navigation}: any): JSX.Element {
  const bottomBar = useRecoilValue(bottomBarState);

  return (
    <>
      <ScrollView
        style={styles.screen}
        pagingEnabled
        scrollEventThrottle={200}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}>
        {videoShortDatas.map((data: any, idx: number) => {
          const videoRef = useRef<any>(null);
          const video = videoIdFilter(data);

          return (
            <Pressable
              key={idx}
              onPress={() => {
                navigation.navigate('VideoInfo', {id: video.id});
              }}
              style={{backgroundColor: 'black'}}>
              <View style={[commonStyles.paddingHor, styles.titleBox]}>
                <View style={styles.titleTop}>
                  <View style={styles.levelBox}>
                    <Text style={styles.level}>중</Text>
                  </View>
                </View>

                <View style={styles.titleBottom}>
                  <Text style={styles.title}>르세라핌 - Antifragile</Text>
                  <Text style={styles.titleBtn}>배우기</Text>
                </View>
              </View>

              <View style={Styles(bottomBar).screen}>
                <Video
                  ref={videoRef}
                  source={video.testUrl}
                  // source={{
                  //   uri: video.url,
                  // }}
                  style={{width: '100%', height: '100%'}}
                  paused={!(video.shortId === idx)} // 재생/중지 여부, 디비에서 시간을 보내주고 setTimeout이용해서 그 시간 지날때마다 멈춰줌
                  resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
                  // repeat={video.kind !== 'detail'} // video가 끝나면 다시 재생할 지 여부
                  onAnimatedValueUpdate={() => {}}
                  muted={true}
                  controls={false} //바텀바가 나옴
                />
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: WINDOW_HEIGHT,
    backgroundColor: 'black',
  },
  titleBox: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    zIndex: 900,
  },
  titleTop: {
    flexDirection: 'row',
  },
  levelBox: {
    width: 24,
    height: 24,
    marginRight: 15,
    marginBottom: 10,
    justifyContent: 'center',

    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 24,
  },
  level: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },

  titleBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    lineHeight: 29,
    color: 'white',
    fontWeight: '800',
    fontSize: 24,
  },
  titleBtn: {
    width: 61,
    paddingVertical: 4,

    textAlign: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',

    color: 'white',
    fontWeight: '500',
    fontSize: 16,

    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },
});

const Styles = (bottomBar: number) =>
  StyleSheet.create({
    screen: {
      width: '100%',
      height: bottomBar,
    },
  });

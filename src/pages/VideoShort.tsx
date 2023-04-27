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
import {useRecoilState, useRecoilValue} from 'recoil';

import {bottomBarState} from '@/recoil/bottomBarState';
import {WINDOW_HEIGHT} from '@/static/commonValue';
import {videoShortDatas} from '@/static/videoDatas';
import {commonStyles} from '@/styles/commonStyles';
import {videoIdFilter} from '@/utils/videoFilter';
import {windowState} from '@/recoil/windowState';
import {videoShortState} from '@/recoil/videoShortState';

export default function VideoShort({navigation}: any): JSX.Element {
  const bottomBar = useRecoilValue(bottomBarState);
  const [window, setWindow] = useRecoilState(windowState);
  const [videoShortTf, setVideoShortTf] = useRecoilState(videoShortState);

  const [page, setPage] = useState<number>(0);

  return (
    <>
      <ScrollView
        style={styles.screen}
        pagingEnabled
        scrollEventThrottle={200}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          const scroll = e.nativeEvent.contentOffset.y;
          setPage(scroll);
        }}>
        {videoShortDatas.map((data: any, idx: number) => {
          const videoRef = useRef<any>(null);
          const video = videoIdFilter(data);

          useEffect(() => {
            // console.log(!(page === idx * bottomBar));
            if (page === idx * bottomBar) {
              if (idx === 0)
                setVideoShortTf([false, true, true, true, true, true]);
              else if (idx === 1)
                setVideoShortTf([true, false, true, true, true, true]);
              else if (idx === 2)
                setVideoShortTf([true, true, false, true, true, true]);
              else if (idx === 3)
                setVideoShortTf([true, true, true, false, true, true]);
              else if (idx === 4)
                setVideoShortTf([true, true, true, true, false, true]);
              else if (idx === 5)
                setVideoShortTf([true, true, true, true, true, false]);

              videoRef.current.seek(0);
            }
          }, [page]);

          return (
            <Pressable
              key={idx}
              onPress={() => {
                if (videoShortTf[idx]) {
                  if (idx === 0)
                    setVideoShortTf([false, true, true, true, true, true]);
                  else if (idx === 1)
                    setVideoShortTf([true, false, true, true, true, true]);
                  else if (idx === 2)
                    setVideoShortTf([true, true, false, true, true, true]);
                  else if (idx === 3)
                    setVideoShortTf([true, true, true, false, true, true]);
                  else if (idx === 4)
                    setVideoShortTf([true, true, true, true, false, true]);
                  else if (idx === 5)
                    setVideoShortTf([true, true, true, true, true, false]);
                } else setVideoShortTf([true, true, true, true, true, true]);
              }}
              style={{backgroundColor: 'black'}}>
              <View style={[commonStyles.paddingHor, styles.titleBox]}>
                <View style={styles.titleTop}>
                  <View style={styles.levelBox}>
                    <Text style={styles.level}>{video.level}</Text>
                  </View>
                </View>

                <View style={styles.titleBottom}>
                  <Text
                    style={[styles.title, {fontSize: window.ipad ? 30 : 20}]}>
                    {video.title}
                  </Text>
                  <Text
                    style={styles.titleBtn}
                    onPress={() => {
                      setVideoShortTf([true, true, true, true, true, true]);
                      navigation.navigate('VideoInfo', {
                        id: video.id,
                        shortId: idx,
                      });
                    }}>
                    배우기
                  </Text>
                </View>
              </View>

              <View style={Styles(bottomBar).screen}>
                <Video
                  ref={videoRef}
                  source={video.testUrl}
                  // source={{
                  //   uri: video.url,
                  // }}
                  style={{
                    width: '100%',
                    height: '100%',
                    opacity: 0.8,
                    // backgroundColor: 'black',
                  }}
                  paused={videoShortTf[idx]} // 재생/중지 여부, 디비에서 시간을 보내주고 setTimeout이용해서 그 시간 지날때마다 멈춰줌
                  resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
                  volume={1.0}
                  ignoreSilentSwitch={'ignore'}
                  playWhenInactive={true}
                  playInBackground={true}
                  repeat={true} // video가 끝나면 다시 재생할 지 여부
                  onAnimatedValueUpdate={() => {}}
                  muted={false}
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
    lineHeight: 34,
    color: 'white',
    fontWeight: '800',
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

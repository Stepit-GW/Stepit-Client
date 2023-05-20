import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Animated,
} from 'react-native';
import {
  MARGIN_HOR,
  MARGIN_VER,
  TOP_HEIGHT,
  videoHeight1,
  videoHeight2,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import Title from '@/components/Title';
import {commonStyles} from '@/styles/commonStyles';
import {useRecoilState} from 'recoil';
import {galleryState} from '@/recoil/galleryState';
import {windowState} from '@/recoil/windowState';

import Video from 'react-native-video';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export default function GalleryDetail({route, navigation}: any): JSX.Element {
  const galleryIdx = route.params.galleryIdx;
  const [window, setWindow] = useRecoilState(windowState);
  const [gallery, setGallery] = useRecoilState(galleryState);
  const [currentIdx, setCurrentIdx] = useState(0);

  const videoRef = useRef<any>();
  const [videoPause, setVideoPause] = useState(true);
  const [videoScreen, setVideoScreen] = useState<any>({
    kind: 'Step',
    url: 'https://www.dropbox.com/s/bhubemuj35zztwr/test.mp4?raw=1',
    testUrl: require('@/assets/notfound.mp4'),
  });

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <View style={styles.topBox}>
          <Pressable
            style={{marginRight: MARGIN_HOR}}
            onPress={() => {
              navigation.pop();
            }}>
            <Image
              source={require('@/assets/arrow-black-24.png')}
              style={commonStyles.img}
            />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {gallery[galleryIdx].uriLst.map((data: any, idx: number) => {
              return (
                <Pressable
                  key={idx}
                  style={[
                    Styles(window.ipad).topBox,
                    currentIdx === idx
                      ? styles.topBox2
                      : Styles(window.ipad).topBox,
                  ]}
                  onPress={() => {
                    setCurrentIdx(idx);
                    setVideoPause(true);
                  }}>
                  <Text
                    style={
                      currentIdx === idx ? styles.boxText2 : styles.boxText
                    }>
                    {idx === 0 ? 'S' : idx}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1,
            width: '100%',

            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: 'black',
          }}>
          {/* <View
            style={{
              width: WINDOW_WIDTH - MARGIN_HOR * 2,
              height: videoHeight2,
              backgroundColor: 'black',
            }}> */}
          <Video
            ref={videoRef}
            source={
              currentIdx === 0
                ? gallery[galleryIdx].uriLst[currentIdx]
                : {uri: gallery[galleryIdx].uriLst[currentIdx]}
            }
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.8,
              borderRadius: 10,
            }}
            paused={videoPause} // 재생/중지 여부, 디비에서 시간을 보내주고 setTimeout이용해서 그 시간 지날때마다 멈춰줌
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
          {/* </View> */}
        </View>

        <View style={styles.bottomBox}>
          {currentIdx === 0 ? (
            <View />
          ) : (
            <Pressable
              style={{marginRight: MARGIN_HOR}}
              onPress={async () => {
                try {
                  const result = await CameraRoll.save(
                    gallery[galleryIdx].uriLst[currentIdx],
                  );
                  Alert.alert('갤러리에 저장 완료', '성공!');
                } catch (err) {
                  Alert.alert('갤러리에 저장 미완료', '실패!');
                }
              }}>
              <Image
                source={require('@/assets/mypage/download-black-24.png')}
                style={commonStyles.img}
              />
            </Pressable>
          )}
          <Pressable
            style={{marginRight: MARGIN_HOR}}
            onPress={() => {
              // navigation.pop();
              setVideoPause(!videoPause);
            }}>
            <Image
              source={
                videoPause
                  ? require('@/assets/mypage/start-black-24.png')
                  : require('@/assets/search-24.png')
              }
              style={commonStyles.img}
            />
          </Pressable>
          {currentIdx === 0 ? (
            <View />
          ) : (
            <Pressable
              style={{marginRight: MARGIN_HOR}}
              onPress={() => {
                // navigation.pop();
              }}>
              <Image
                source={require('@/assets/mypage/trash-black-24.png')}
                style={commonStyles.img}
              />
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBox: {
    marginTop: MARGIN_VER,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBox2: {
    backgroundColor: 'black',
  },
  bottomBox: {
    marginVertical: 34,

    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  boxText2: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
  boxText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '700',
  },
});

const Styles = (ipad: boolean) =>
  StyleSheet.create({
    topBox: {
      width: ipad ? 100 : 52,
      height: ipad ? 36 : 22,
      marginRight: ipad ? MARGIN_HOR : 8,
      justifyContent: 'center',

      borderWidth: 1,
      borderRadius: 5,
    },
  });

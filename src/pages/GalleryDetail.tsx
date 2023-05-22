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

  const scrollRef = useRef<any>();
  const videoRef = useRef<any>();
  const [videoPause, setVideoPause] = useState(true);

  useEffect(() => {
    scrollRef.current.scrollTo({y: 0});
  }, []);

  return (
    // <SafeAreaView style={commonStyles.container}>
    <View style={commonStyles.containerView}>
      <View style={styles.topBox}>
        <Pressable
          style={{marginRight: MARGIN_HOR}}
          onPress={() => {
            navigation.pop();
          }}>
          <Image
            source={require('@/assets/arrow-white-24.png')}
            style={Styles(window.ipad).img}
          />
        </Pressable>
        {currentIdx !== 0 && (
          <View style={styles.topBoxRight}>
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
                source={require('@/assets/mypage/download-white-24.png')}
                style={commonStyles.img}
              />
            </Pressable>
            <Pressable
              style={{paddingRight: MARGIN_HOR * 2}}
              onPress={() => {
                let newGallery = gallery;
                if (newGallery[galleryIdx].uriLst.length === 2) {
                  newGallery = newGallery.filter((data: any) => {
                    return data.id !== gallery[galleryIdx].id;
                  });
                  setGallery(newGallery);
                  navigation.pop();
                } else {
                  console.log('b');
                  newGallery[galleryIdx].uriLst = gallery[
                    galleryIdx
                  ].uriLst.filter((data: any, idx: number) => {
                    return idx !== currentIdx;
                  });
                  setGallery(newGallery);
                  setCurrentIdx(0);
                }
              }}>
              <Image
                source={require('@/assets/mypage/trash-white-24.png')}
                style={commonStyles.img}
              />
            </Pressable>
            {/* <Pressable style={{marginRight: MARGIN_HOR}} onPress={() => {}}>
              <Image
                source={require('@/assets/none-24.png')}
                style={commonStyles.img}
              />
            </Pressable> */}
          </View>
        )}
      </View>

      <Pressable
        style={{
          flex: 1,
          width: '100%',

          justifyContent: 'center',
          backgroundColor: 'black',
        }}
        onPress={() => {
          setVideoPause(!videoPause);
        }}>
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
      </Pressable>

      <View style={styles.topScroll}>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
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
                  style={currentIdx === idx ? styles.boxText2 : styles.boxText}>
                  {idx === 0 ? 'S' : idx}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        {/* <View style={{width: '100%', height: '100%', backgroundColor: 'red'}} /> */}
      </View>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBox: {
    width: '100%',
    marginTop: MARGIN_VER * 2,
    marginBottom: 25,
    marginHorizontal: MARGIN_HOR,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    position: 'absolute',
    zIndex: 999,
  },
  topBoxRight: {
    flexDirection: 'row',
    marginRight: MARGIN_HOR,
  },

  topScroll: {
    height: '100%',
    marginRight: MARGIN_HOR,
    marginBottom: 30,

    position: 'absolute',
    right: 0,
    bottom: 0,

    zIndex: 999,
    transform: [{scaleY: -1}],
  },

  topBox2: {
    backgroundColor: 'rgb(180, 180, 180)',
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
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
});

const Styles = (ipad: boolean) =>
  StyleSheet.create({
    topBox: {
      width: ipad ? 40 : 40,
      height: ipad ? 40 : 40,
      marginBottom: 20,
      // marginRight: ipad ? MARGIN_HOR : 8,
      justifyContent: 'center',

      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 40,

      transform: [{scaleY: -1}],
    },

    img: {
      width: ipad ? 40 : 24,
      height: ipad ? 40 : 24,
      marginRight: ipad ? 10 : 5,
    },
  });

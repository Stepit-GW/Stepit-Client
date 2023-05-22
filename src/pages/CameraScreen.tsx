import {videoShortState} from '@/recoil/videoShortState';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Button,
  Pressable,
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  // CameraRoll,
  LogBox,
} from 'react-native';
import Video from 'react-native-video';
import Share from 'react-native-share';

import {RNCamera} from 'react-native-camera';
import {useRecoilState} from 'recoil';
import {videoIdFilter} from '@/utils/videoFilter';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  MARGIN_VER,
  MARGIN_HOR,
} from '@/static/commonValue';
import {windowState} from '@/recoil/windowState';
import {galleryState} from '@/recoil/galleryState';

LogBox.ignoreAllLogs();

export default function CameraScreen({navigation, route}: any): JSX.Element {
  const id = route.params.id;
  const shortId = route.params.shortId;
  const [num, setNum] = useState(0);
  const [, setVideoShortTf] = useRecoilState(videoShortState);
  const [window, setWindow] = useRecoilState(windowState);
  const [gallery, setGallery] = useRecoilState(galleryState);

  const videoRef = useRef<any>(null);
  const video = videoIdFilter({id: id});
  const [allTime, setAllTime] = useState<number>(0);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoPause, setVideoPause] = useState<boolean>(true);
  const [cameraRef, setCameraRef] = useState(null);
  const [count, setCount] = useState<number>(4);

  const [timeId, setTimeId] = useState(0);
  async function handleRecordButton() {
    try {
      if (!cameraRef) {
        return;
      }
      if (isRecording) {
        clearTimeout(timeId);
        const result = cameraRef.stopRecording();
        setIsRecording(false);
        setVideoPause(true);
      } else {
        setCount(3);
        setTimeout(() => {
          setCount(2);
        }, 1000);
        setTimeout(() => {
          setCount(1);
        }, 2000);
        setTimeout(async () => {
          setIsRecording(true);
          setTimeout(() => {
            setVideoPause(false);
          }, 500);

          setNum(num + 1);
          videoRef.current.seek(0);
          setCount(4);
          const options = {
            quality: RNCamera.Constants.VideoQuality['1080p'],
            maxDuration: 100000, //allTime
          };
          const timeId2 = setTimeout(() => {
            const result = cameraRef.stopRecording();
            setIsRecording(false);
            setVideoPause(true);
          }, allTime * 1000);
          setTimeId(timeId2);

          const data = await cameraRef.recordAsync(options);

          const pastGalleryList: any = gallery.filter((data: any) => {
            return data.id !== id;
          });
          let newGallery: any = gallery.filter((data: any) => {
            return data.id === id;
          });
          if (newGallery.length === 1) {
            let newUriLst = [...newGallery[0].uriLst, data.uri];
            newGallery[0].uriLst = newUriLst;
            pastGalleryList.unshift(newGallery[0]);
          } else {
            pastGalleryList.unshift({
              id: id,
              uriLst: [video.testUrl, data.uri],
            });
          }
          setGallery(pastGalleryList);

          // if (data.uri) {
          //   const result = await CameraRoll.save(data.uri);
          // }
        }, 3000);
      }
    } catch (err) {}
  }

  return (
    <View style={{flex: 1}}>
      <RNCamera
        style={{flex: 1}}
        type={RNCamera.Constants.Type.front}
        ref={(ref: any) => {
          setCameraRef(ref);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            // justifyContent: 'center',
          }}>
          <Pressable
            style={{
              width: '100%',
              height: 24,
              marginTop: MARGIN_VER * 2,
              marginLeft: MARGIN_HOR,
              position: 'absolute',
            }}
            onPress={() => {
              navigation.pop();
              setIsRecording(false);
              setTimeout(() => {
                if (shortId !== undefined)
                  if (shortId === 0)
                    setVideoShortTf([false, true, true, true, true, true]);
                  else if (shortId === 1)
                    setVideoShortTf([true, false, true, true, true, true]);
                  else if (shortId === 2)
                    setVideoShortTf([true, true, false, true, true, true]);
                  else if (shortId === 3)
                    setVideoShortTf([true, true, true, false, true, true]);
                  else if (shortId === 4)
                    setVideoShortTf([true, true, true, true, false, true]);
                  else if (shortId === 5)
                    setVideoShortTf([true, true, true, true, true, false]);
              }, 1000);
            }}>
            <Image
              source={require('@/assets/arrow-white-24.png')}
              style={{
                width: window.ipad ? 48 : 24,
                height: window.ipad ? 48 : 24,
              }}
            />
          </Pressable>
          <View
            style={{
              width: '50%',
              height: (((WINDOW_WIDTH / 2) * 1) / 3) * 2,
              opacity: 0.8,

              position: 'absolute',
              right: MARGIN_HOR,
              top: MARGIN_VER * 3,
              backgroundColor: 'black',
            }}
          />
          <Video
            ref={videoRef}
            source={video.testUrl}
            // source={{
            //   uri: video.url,
            // }}
            style={{
              width: '50%',
              height: (((WINDOW_WIDTH / 2) * 1) / 3) * 2,
              opacity: 0.8,

              position: 'absolute',
              right: MARGIN_HOR,
              top: MARGIN_VER * 3,
            }}
            onLoad={(e: any) => {
              setAllTime(e.duration);
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
          {count !== 4 && (
            <View style={styles.count}>
              <Text style={styles.countText}>{count}</Text>
            </View>
          )}
          {/* <Pressable
            style={{position: 'absolute', top: 200}}
            onPress={() => {
              myCustomShare();
            }}>
            <Text style={styles.countText}>Share</Text>
          </Pressable> */}
          <Pressable
            style={styles.recoding}
            onPress={() => {
              if (count === 4) handleRecordButton();
            }}>
            {isRecording ? (
              <View style={styles.stop} />
            ) : (
              <View style={styles.start} />
            )}
          </Pressable>
        </View>
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  recoding: {
    width: 56,
    height: 56,
    marginLeft: WINDOW_WIDTH / 2 - 28,
    marginBottom: 48,

    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 48,
    backgroundColor: 'white',
  },
  stop: {
    width: 36,
    height: 36,
    // marginBottom: 52,
    backgroundColor: 'red',
  },
  start: {
    width: 48,
    height: 48,
    // marginBottom: 48,

    borderRadius: 48,
    backgroundColor: 'red',
  },

  count: {
    width: 40,
    height: 40,

    position: 'absolute',
    top: WINDOW_HEIGHT / 2,
    left: WINDOW_WIDTH / 2 - 20,

    zIndex: 999,
  },
  countText: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
});

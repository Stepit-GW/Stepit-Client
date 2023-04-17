import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
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
import {MARGIN_HOR, WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';
import {useRecoilState} from 'recoil';
import {videoTutorialState} from '@/recoil/videoTutorialState';
import {windowState} from '@/recoil/windowState';
import Video from 'react-native-video';

export default function VideoScreen({
  aniScreenWidth,
  aniScreenHeight,
  aniScreenRotate,
  aniVideoFnHeight,
}: any): JSX.Element {
  const [window] = useRecoilState(windowState);
  const [videoStart, setVideoStart] = useState(false);

  const translateX = {
    translateX: -(WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
  };
  const translateY = {
    translateX: (WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
  };
  const rotate = {
    rotate: aniScreenRotate,
  };

  return (
    <Animated.View
      style={[
        {
          width: aniScreenWidth,
          height: aniScreenHeight,
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          backgroundColor: 'black',
          zIndex: 901,
          transform: [translateX, rotate, translateY],
        },
      ]}>
      <Animated.View
        style={{
          width: window.force
            ? window.orientation
              ? window.width
              : (window.height / 2) * 3
            : '100%',
          height: window.force
            ? window.orientation
              ? (window.width / 3) * 2
              : window.height
            : aniVideoFnHeight,
        }}>
        <Video
          source={require('@/assets/test.mp4')}
          style={{width: '100%', height: '100%'}}
          paused={videoStart} // 재생/중지 여부, 디비에서 시간을 보내주고 setTimeout이용해서 그 시간 지날때마다 멈춰줌
          resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
          onLoad={(e: any) => {
            // console.log(e);
            setTimeout(() => {
              setVideoStart(true);
            }, 5000);
          }} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
          repeat={videoStart} // video가 끝나면 다시 재생할 지 여부
          onAnimatedValueUpdate={() => {}}
          muted={true}
          controls={true} //바텀바가 나옴
        />
      </Animated.View>
    </Animated.View>
  );
}

const Styles = (ipad: boolean, force: boolean) =>
  StyleSheet.create({
    tutorialTitle: {
      height: ipad ? 54 : 36,

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tutorialImg: {
      width: ipad ? 40 : 24,
      height: ipad ? 40 : 24,
      marginRight: MARGIN_HOR,
    },
  });

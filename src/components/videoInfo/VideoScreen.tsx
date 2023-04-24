import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {useRecoilState} from 'recoil';
import {windowState} from '@/recoil/windowState';
import Video from 'react-native-video';

export default function VideoScreen({
  rate,
  mirror,
  videoRef,
  videoPause,
  setVideoPause,
  setCurrentTime,
  setAllTime,
  stopTime,
  videoScreen,
  aniScreenWidth,
  aniScreenHeight,
  rotate,
  aniVideoFnHeight,
  _Voice,
}: any): JSX.Element {
  const [num, setNum] = useState<number>(0);
  const reload = () => {
    setNum(num + 1);
  };

  const [window] = useRecoilState(windowState);

  useEffect(() => {
    if (videoScreen.kind === 'detail') _Voice();
    reload();
  }, [videoScreen]);

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
          transform: rotate,
        },
      ]}>
      <Animated.View
        style={[
          {
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
            backgroundColor: 'black',
          },
          window.force && {alignSelf: 'center'},
          mirror && {transform: [{rotateY: '180deg'}]},
        ]}>
        <Video
          ref={videoRef}
          source={{
            uri: videoScreen.url,
          }}
          style={{width: '100%', height: '100%'}}
          paused={videoPause} // 재생/중지 여부, 디비에서 시간을 보내주고 setTimeout이용해서 그 시간 지날때마다 멈춰줌
          resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
          rate={rate}
          onLoad={(e: any) => {
            setAllTime(e.duration);
            // videoRef.current.seek(6);
          }} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
          onProgress={(e: any) => {
            setCurrentTime(e.currentTime);
            // if (stopTime !== undefined) {
            //   for (let i = 0; i < stopTime.length; i++)
            //     if (
            //       stopT !== Math.round(e.currentTime) &&
            //       stopTime[i].time === Math.round(e.currentTime)
            //     ) {
            //       setVideoPause(true);
            //       setStopT(Math.round(e.currentTime));
            //     }
            // }
          }}
          repeat={videoScreen.kind !== 'detail'} // video가 끝나면 다시 재생할 지 여부
          onAnimatedValueUpdate={() => {}}
          muted={true}
          controls={false} //바텀바가 나옴
        />
      </Animated.View>
    </Animated.View>
  );
}

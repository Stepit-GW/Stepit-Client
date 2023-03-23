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
import {commonStyles} from '@/styels/commonStyles';
import Video from 'react-native-video';

export default function Home({navigation}: any): JSX.Element {
  const [videoStart, setVideoStart] = useState(false);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}>
        {/* <Pressable
          onPress={() => {
            console.log('a');
            setVideoStart(true);
            // setTimeout(() => {
            //   setVideoStart(false);
            // }, 500);
          }}> */}
        <Video
          source={require('@/assets/test.mp4')}
          style={styles.fullScreen}
          paused={videoStart} // 재생/중지 여부, 디비에서 시간을 보내주고 setTimeout이용해서 그 시간 지날때마다 멈춰줌
          resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
          onLoad={(e: any) => {
            console.log(e);
            setTimeout(() => {
              setVideoStart(true);
            }, 5000);
          }} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
          repeat={videoStart} // video가 끝나면 다시 재생할 지 여부
          onAnimatedValueUpdate={() => {}}
          muted={true}
          controls={true} //바텀바가 나옴
        />
        {/* 바텀은 멈추는 시간대를 모두 받아오고, 비율로 계산에서 그려낼거임 */}
        <Pressable
          onPress={() => {
            setVideoStart(!videoStart);
          }}>
          <Text>버튼</Text>
        </Pressable>

        {/* </Pressable> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

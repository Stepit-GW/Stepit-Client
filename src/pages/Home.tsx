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
import {MARGIN_VER, TOP_HEIGHT} from '@/static/commonValue';
import {homeDatas} from '@/static/home/homeDatas';
// import Video from 'react-native-video';

export default function Home({navigation}: any): JSX.Element {
  const [videoStart, setVideoStart] = useState(false);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}>
        <View
          style={[
            commonStyles.paddingHor,
            {marginTop: MARGIN_VER},
            styles.titleBox,
          ]}>
          <View style={commonStyles.img} />
          <Text style={styles.title}>STEPIT</Text>
          <Image
            source={require('@/assets/search-24.png')}
            style={commonStyles.img}
          />
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {homeDatas.map((data: any, idx: number) => {
            return (
              <View key={idx} style={styles.scrollImgBox}>
                <Text style={styles.scrollTitle}>맞"춤"추천</Text>
                <ScrollView
                  style={styles.scrollImg}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  {data.videos.map((video: any, videoIdx: number) => {
                    return (
                      <View key={videoIdx} style={styles.videoBox}>
                        <Image
                          source={require('@/assets/notfound.png')}
                          style={commonStyles.img100}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>

        {/* <Pressable
          onPress={() => {
            console.log('a');
            setVideoStart(true);
            // setTimeout(() => {
            //   setVideoStart(false);
            // }, 500);
          }}> */}
        {/* <Video
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
          // controls={true} //바텀바가 나옴
        /> */}
        {/* 바텀은 멈추는 시간대를 모두 받아오고, 비율로 계산에서 그려낼거임 */}
        {/* <Pressable
          onPress={() => {
            setVideoStart(!videoStart);
          }}>
          <Text>버튼</Text>
        </Pressable> */}

        {/* </Pressable> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    height: TOP_HEIGHT,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    lineHeight: 36,
    fontWeight: '700',
    fontSize: 30,
  },

  scroll: {
    paddingTop: 30,
  },
  scrollImgBox: {
    marginLeft: MARGIN_VER,
    paddingBottom: 30,
  },
  scrollTitle: {
    marginBottom: 20,
  },
  scrollImg: {},

  videoBox: {
    width: 125,
    height: 196,
    marginRight: MARGIN_VER,

    overflow: 'hidden',
    borderRadius: 15,
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

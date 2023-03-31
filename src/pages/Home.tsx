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
                <Text style={styles.scrollTitle}>{data.title}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {data.videos.map((video: any, videoIdx: number) => {
                    return (
                      <View key={videoIdx} style={styles.videoBox}>
                        <Text style={styles.videoTitle}>{video.title}</Text>
                        <View style={styles.videoBottom}>
                          <Text style={styles.videoLeft}>{video.level}</Text>
                          <Text style={styles.videoRight}>{video.time}</Text>
                        </View>
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
    lineHeight: 19,

    fontSize: 16,
    fontWeight: '700',
  },

  videoBox: {
    width: 125,
    height: 196,
    marginRight: MARGIN_VER,

    overflow: 'hidden',
    borderRadius: 15,
  },
  videoTitle: {
    width: '100%',
    marginTop: 10,

    position: 'absolute',
    top: 0,

    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 10,

    zIndex: 900,
  },
  videoBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'absolute',
    bottom: 5,

    zIndex: 900,
    // backgroundColor: 'red',
  },
  videoLeft: {
    width: 24,
    paddingVertical: 4,
    marginLeft: 6,

    color: 'white',
    textAlign: 'center',

    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
  },
  videoRight: {
    marginRight: 6,
    color: 'white',
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

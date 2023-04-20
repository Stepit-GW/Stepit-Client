import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MARGIN_HOR, WINDOW_HEIGHT} from '@/static/commonValue';
import {commonStyles} from '@/styles/commonStyles';
import {useNavigation} from '@react-navigation/native';
// import Video from 'react-native-video';

export default function Tutorial({
  idx,
  data,
  videoRef,
  videoStopTimeTf,
  setVideoStopTimeTf,
  setVideoScreen,
  setVideoPause,
  currentTime,
  reload,
}: any): JSX.Element {
  const navigation = useNavigation<any>();
  const minute = Math.floor(currentTime / 60);
  const seconde = Math.round(currentTime % 60);

  const [height, setHeight] = useState(false);
  const aniHeight = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniHeightFn = (t: number) => {
    Animated.timing(aniHeight, {
      toValue: t,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      key={idx}
      style={styles.accodian}
      onPress={() => {
        let lst = videoStopTimeTf;
        lst[idx] = !videoStopTimeTf[idx];
        if (lst[idx]) {
          setHeight(true);
          aniHeightFn(data.videoTimes.length * 76 + 10);
          // videoRef.current.seek(data.time);
          // setTimeout(() => {
          //   setVideoPause(true);
          // }, 200);
        } else {
          aniHeightFn(0);
          setTimeout(() => {
            setHeight(false);
          }, 500);
        }
        setVideoStopTimeTf(lst);
        reload();
      }}>
      <View
        style={[
          styles.boxName,
          {
            backgroundColor:
              minute * 60 + seconde >= data.time
                ? '#B0B0B0'
                : videoStopTimeTf[idx]
                ? '#EBEBEB'
                : '#FBFBFB',
          },
        ]}>
        <Text style={styles.step}>Tag. {idx + 1}</Text>
        <View style={styles.contents}>
          <Text style={styles.title}>
            {Math.floor(data.time / 60)}:
            {String(Math.round(data.time % 60)).padStart(2, '0')}
          </Text>
          {videoStopTimeTf[idx] ? (
            <Image
              source={require('@/assets/video/arrow-top-24.png')}
              style={commonStyles.img}
            />
          ) : (
            <Image
              source={require('@/assets/video/arrow-bottom-24.png')}
              style={commonStyles.img}
            />
          )}
        </View>
      </View>

      <Animated.View
        style={{
          width: '100%',
          height: aniHeight,
        }}>
        {data.videoTimes.map((data2: any, idx2: number) => {
          return (
            <Pressable
              key={idx2}
              style={[
                styles.video,
                {
                  display: height ? 'flex' : 'none',
                },
              ]}
              onPress={() => {
                navigation.navigate('VideoTutorial', {id: data2.id});
              }}>
              <View style={styles.imgBox}>
                <Image
                  source={{uri: data2.imgUrl}}
                  style={commonStyles.img100}
                />
              </View>
              <View style={{marginLeft: 15}}>
                <Text>{data2.title}</Text>
                <Text>{data2.time}</Text>
              </View>
            </Pressable>
          );
        })}
        <View style={{height: 150, backgroundColor: 'white'}} />
      </Animated.View>
      <View style={{height: 10, backgroundColor: 'white'}} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  accodian: {
    width: '100%',
    // marginBottom: 10,
  },
  imgBox: {
    width: 100,
    height: 56,
    overflow: 'hidden',
    borderRadius: 5,
  },

  boxName: {
    width: '100%',
    height: 68,
    paddingHorizontal: 15,
    justifyContent: 'center',

    borderRadius: 10,
  },
  step: {
    marginBottom: 10,
    color: 'black',
    lineHeight: 19,
    fontSize: 16,
    fontWeight: '300',
  },
  contents: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    lineHeight: 19,
    fontSize: 16,
    fontWeight: '700',
  },

  video: {
    width: '100%',
    height: 76,
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  heartImg: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },

  tutorial: {
    width: '100%',
    height: WINDOW_HEIGHT,
    paddingHorizontal: MARGIN_HOR,

    backgroundColor: 'white',
  },
});

const Styles = (ipad: boolean) =>
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

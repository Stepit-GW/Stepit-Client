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
import {useNavigation} from '@react-navigation/native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';
// import Video from 'react-native-video';

export default function Accodian({
  idx,
  data,
  detailDatas,
  setDetailData,
  aniVideo,
  reload,
}: any): JSX.Element {
  const videoHeight = (WINDOW_WIDTH / 3) * 2;

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
        let lst = detailDatas;
        lst[idx].tf = !detailDatas[idx].tf;
        if (lst[idx].tf) {
          setHeight(true);
          aniHeightFn(detailDatas[idx].videos.length * 76 + 10);
        } else {
          aniHeightFn(0);
          setTimeout(() => {
            setHeight(false);
          }, 500);
        }
        setDetailData(lst);
        reload();
      }}>
      <View
        style={[
          styles.boxName,
          {backgroundColor: data.tf ? '#EBEBEB' : '#FBFBFB'},
        ]}>
        <Text style={styles.step}>Step. {idx + 1}</Text>
        <View style={styles.contents}>
          <Text style={styles.title}>{data.boxName}</Text>
          {data.tf ? (
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
        {data.videos.map((data2: any, idx2: number) => {
          return (
            <Pressable
              key={idx2}
              style={[styles.video, {display: height ? 'flex' : 'none'}]}
              onPress={() => {
                aniVideo(videoHeight, WINDOW_HEIGHT - videoHeight, 0, 1);
              }}>
              <View style={styles.imgBox}>
                <Image
                  source={require('@/assets/notfound.png')}
                  style={commonStyles.img100}
                />
              </View>
              <View style={{marginLeft: 15}}>
                <Text>{data2.title}</Text>
                <Text>{data2.time}</Text>
              </View>
              <Image
                source={require('@/assets/heart-black-24.png')}
                style={[commonStyles.img, styles.heartImg]}
              />
            </Pressable>
          );
        })}
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
});

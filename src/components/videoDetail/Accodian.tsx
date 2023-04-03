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
import {
  MARGIN_HOR,
  MARGIN_VER,
  TOP_HEIGHT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {homeDatas} from '@/static/home/homeDatas';
import BottomSheet from '@/components/home/BottomSheet';
import TitleAnimated from '@/components/home/TitleAnimated';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {bottomBarState} from '@/recoil/bottomBarState';
// import Video from 'react-native-video';

export default function Accodian({
  idx,
  data,
  detailDatas,
  setDetailData,
  reload,
}: any): JSX.Element {
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
          aniHeightFn(detailDatas[idx].videos.length * 76 + 10);
          setHeight(true);
        } else {
          aniHeightFn(0);
          setTimeout(() => {
            setHeight(false);
          }, 500);
        }
        setDetailData(lst);
        reload();
      }}>
      <View style={styles.boxName}>
        <Text>Step. {idx + 1}</Text>
        <View>
          <Text>{data.boxName}</Text>
        </View>
      </View>
      <Animated.View
        style={{
          width: '100%',
          height: aniHeight,
        }}>
        {data.videos.map((data2: any, idx2: number) => {
          return (
            <View
              key={idx2}
              style={[styles.video, {display: height ? 'flex' : 'none'}]}>
              <View style={styles.imgBox}>
                <Image
                  source={require('@/assets/notfound.png')}
                  style={commonStyles.img100}
                />
              </View>
              <View>
                <Text>{data2.title}</Text>
                <Text>{data2.time}</Text>
              </View>
              <Image
                source={require('@/assets/mypage/heart-24.png')}
                style={[commonStyles.img, styles.heartImg]}
              />
            </View>
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
    borderRadius: 10,
    backgroundColor: '#999',
  },

  video: {
    width: '100%',
    height: 56,
    marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    // backgroundColor: '#777',
  },

  heartImg: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
});

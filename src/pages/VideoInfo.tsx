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
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {videoDetailDatas} from '@/static/videoDetail/videoDetailDatas';
import Accodian from '@/components/videoInfo/Accodian';

export default function VideoInfo(): JSX.Element {
  const [num, setNum] = useState(0);
  const reload = () => {
    setNum(num + 1);
  };
  const navigation = useNavigation<any>();

  const topImgBox = (WINDOW_WIDTH / 10) * 11;
  const [detailDatas, setDetailData] = useState<any>([]);
  useEffect(() => {
    setDetailData(videoDetailDatas);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={['transparent', 'transparent', 'white']}
          style={[commonStyles.screenImg, styles.linearGradient]}>
          <Text style={styles.title}>르세라핌 - </Text>

          <View style={styles.row}>
            <Image
              source={require('@/assets/video/video-24.png')}
              style={commonStyles.img}
            />
            <Text style={styles.timeText}>1분 20초</Text>
          </View>

          <View
            style={[
              styles.row,
              {marginBottom: 12, justifyContent: 'space-between'},
            ]}>
            <View style={styles.row}>
              <Text style={styles.level}>상</Text>
              <Text style={styles.level}>중</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.level}>상</Text>
              <Text style={styles.level}>중</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      <Image
        source={require('@/assets/notfound.png')}
        style={[commonStyles.screenImg, styles.screenImg]}
      />

      <SafeAreaView
        style={[
          styles.safeAreaView,
          {
            height: topImgBox,
          },
        ]}>
        <View>
          <Title
            style={[commonStyles.paddingHor, {marginTop: MARGIN_VER}]}
            leftComponent={
              <Pressable
                onPress={() => {
                  navigation.pop();
                }}>
                <Image
                  source={require('@/assets/arrow-white-24.png')}
                  style={commonStyles.img}
                />
              </Pressable>
            }
            rightComponent={
              <Pressable
                onPress={() => {
                  navigation.pop();
                }}>
                <Image
                  source={require('@/assets/screen-scaleup-24.png')}
                  style={commonStyles.img}
                />
              </Pressable>
            }
          />
        </View>
      </SafeAreaView>

      <SafeAreaView
        style={[
          styles.safeAreaView,
          {
            height: WINDOW_HEIGHT - topImgBox,
            top: topImgBox,
            backgroundColor: 'white',
          },
        ]}>
        <View>
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}>
            <View style={{height: 20}} />
            {detailDatas.map((data: any, idx: number) => {
              return (
                <Accodian
                  key={idx}
                  idx={idx}
                  data={data}
                  detailDatas={detailDatas}
                  setDetailData={setDetailData}
                  reload={reload}
                />
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,

    position: 'absolute',

    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 901,
  },
  safeAreaView: {
    width: '100%',
    position: 'absolute',
    zIndex: 902,
  },
  linearGradient: {
    paddingHorizontal: MARGIN_HOR,
    flex: 1,
    justifyContent: 'flex-end',
  },

  title: {
    marginBottom: 10,
    lineHeight: 36,
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
  },
  timeText: {
    color: 'white',
    lineHeight: 19,
    fontWeight: '500',
    fontSize: 16,
  },
  row: {
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  level: {
    width: 24,
    paddingVertical: 4,
    marginLeft: 6,

    color: 'white',
    textAlign: 'center',

    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
  },

  scroll: {
    height: '100%',
    paddingHorizontal: MARGIN_HOR,
    backgroundColor: 'white',
  },
  screenImg: {
    position: 'absolute',
    zIndex: 900,
  },
});

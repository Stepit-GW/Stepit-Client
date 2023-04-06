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
import Accodian from '@/components/Accodian';
import {useSetRecoilState} from 'recoil';
import {modalVideoState} from '@/recoil/modalVideoState';

export default function VideoDetail(): JSX.Element {
  const [num, setNum] = useState(0);
  const reload = () => {
    setNum(num + 1);
  };
  const navigation = useNavigation<any>();
  const setModalVideo = useSetRecoilState(modalVideoState);

  const [detailDatas, setDetailData] = useState<any>([]);
  useEffect(() => {
    setDetailData(videoDetailDatas);
  }, []);

  return (
    <>
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.containerView}>
          <Image
            source={require('@/assets/notfound.png')}
            style={commonStyles.videoImg}
          />
          <Title
            style={[
              commonStyles.paddingHor,
              {
                marginTop: MARGIN_VER,
                position: 'absolute',
                top: 0,
              },
            ]}
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
                  setModalVideo(true);
                }}>
                <Image
                  source={require('@/assets/screen-scaleup-24.png')}
                  style={commonStyles.img}
                />
              </Pressable>
            }
          />
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
  scroll: {
    height: '100%',
    paddingHorizontal: MARGIN_HOR,
    backgroundColor: 'white',
  },
});

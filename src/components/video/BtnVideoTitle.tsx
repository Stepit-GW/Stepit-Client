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
import {useNavigation} from '@react-navigation/native';
import {videoDetailDatas} from '@/static/videoDetail/videoDetailDatas';
import Accodian from '@/components/videoInfo/Accodian';
import LinearGradientVideo from '@/components/videoInfo/LinearGradientVideo';
import {windowState} from '@/recoil/windowState';
import {useRecoilState, useRecoilValue} from 'recoil';
import BtnVideoLine from '@/components/video/BtnVideoLine';
import BtnVideoTimeScale from '@/components/video/BtnVideoTimeScale';
import BtnVideoSetting from '@/components/video/BtnVideoSetting';

export default function BtnVideoTitle(): JSX.Element {
  const [num, setNum] = useState(0);
  const reload = () => {
    setNum(num + 1);
  };
  const navigation = useNavigation<any>();
  const videoHeight = (WINDOW_WIDTH / 10) * 11;
  const [window, setWindow] = useRecoilState(windowState);

  const aniVideoHeight = useRef<Animated.Value>(
    new Animated.Value(videoHeight),
  ).current;
  const aniScrollHeight = useRef<Animated.Value>(
    new Animated.Value(WINDOW_HEIGHT - videoHeight),
  ).current;
  const aniOpacity = useRef<Animated.Value>(new Animated.Value(1)).current;
  const aniOpacityT = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniVideo = (vh: number, sh: number, o: number, ot: number) => {
    Animated.timing(aniVideoHeight, {
      toValue: vh,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniScrollHeight, {
      toValue: sh,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniOpacity, {
      toValue: o,
      duration: 800,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniOpacityT, {
      toValue: ot,
      duration: 800,
      useNativeDriver: false,
    }).start();
    if (o === 1) setZIndex(true);
    else setZIndex(false);
  };
  const [zIndex, setZIndex] = useState(true);

  const aniScreenWidth = useRef<Animated.Value>(
    new Animated.Value(WINDOW_WIDTH),
  ).current;
  const aniScreenHeight = useRef<Animated.Value>(
    new Animated.Value(WINDOW_HEIGHT),
  ).current;
  const spinValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniScreenRotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
  const aniScreen = (vh: number, sh: number, r: number) => {
    Animated.timing(aniScreenWidth, {
      toValue: vh,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniScreenHeight, {
      toValue: sh,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(spinValue, {
      toValue: r,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const btnOpacity = {opacity: window.force ? 0 : 1};
  const translateX = {
    translateX: -(WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
  };
  const translateY = {
    translateX: (WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
  };
  const rotate = {
    rotate: aniScreenRotate,
  };

  const [preMove, setPreMove] = useState<number>(0);
  const [scrollH, setScrollH] = useState<number>(0);
  const [detailDatas, setDetailData] = useState<any>([]);
  useEffect(() => {
    setDetailData(videoDetailDatas);
  }, []);

  return (
    <SafeAreaView
      style={[
        commonStyles.container,
        styles.containerTitle,
        {
          width: window.width,
          height: window.force ? window.height : 0,
          zIndex: 902,
          transform: [
            translateX,
            {rotate: window.force ? '90deg' : '0deg'},
            translateY,
          ],
        },
      ]}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: window.force ? MARGIN_HOR * 3 : MARGIN_HOR,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={commonStyles.row}>
          {!window.force && (
            <Pressable
              onPress={() => {
                navigation.pop();
                let lst = detailDatas;
                for (let i = 0; i < detailDatas.length; i++) lst[i].tf = false;
                setDetailData(lst);
                setWindow({
                  ...window,
                  width: WINDOW_WIDTH,
                  height: WINDOW_WIDTH,
                  force: false,
                });
              }}>
              <Image
                source={require('@/assets/arrow-white-24.png')}
                style={commonStyles.img}
              />
            </Pressable>
          )}
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',

              fontWeight: '600',
              fontSize: 16,
              lineHeight: 19,
            }}>
            르세르팜
          </Text>
        </View>
        <View style={commonStyles.row}>
          {!window.force && (
            <>
              <Pressable style={btnOpacity} onPress={() => {}}>
                <Image
                  source={require('@/assets/video/mirror-mode-24.png')}
                  style={commonStyles.img}
                />
              </Pressable>
              <Pressable style={btnOpacity} onPress={() => {}}>
                <Image
                  source={require('@/assets/video/double-speed-24.png')}
                  style={commonStyles.img}
                />
              </Pressable>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

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
import {windowState} from '@/recoil/windowState';
import {useRecoilState, useRecoilValue} from 'recoil';

export default function BtnVideoTitle({aniOpacityT}: any): JSX.Element {
  const navigation = useNavigation<any>();
  const [window, setWindow] = useRecoilState(windowState);

  const btnOpacity = {opacity: window.force ? 0 : 1};
  const translateX = {
    translateX: -(WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
  };
  const translateY = {
    translateX: (WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
  };

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
          zIndex: window.force ? 902 : 999,
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
        <Animated.View style={[commonStyles.row, {opacity: aniOpacityT}]}>
          {!window.force && (
            <>
              <Pressable
                style={[btnOpacity, {marginRight: 8}]}
                onPress={() => {
                  console.log('거울');
                }}>
                <Image
                  source={require('@/assets/video/mirror-mode-24.png')}
                  style={commonStyles.img}
                />
              </Pressable>
              <Pressable
                style={btnOpacity}
                onPress={() => {
                  console.log('속도');
                }}>
                <Image
                  source={require('@/assets/video/double-speed-24.png')}
                  style={commonStyles.img}
                />
              </Pressable>
            </>
          )}
        </Animated.View>
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

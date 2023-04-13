import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {useRecoilState, useRecoilValue} from 'recoil';
import {modalVideoState} from '@/recoil/modalVideoState';
import {
  MARGIN_HOR,
  MARGIN_VER,
  TOP_HEIGHT,
  videoHeight2,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {useNavigation} from '@react-navigation/native';
import {windowState} from '@/recoil/windowState';
import BtnVideoMove from '@/components/video/BtnVideoMove';

export default function BtnVideoTimeScale({aniScreen}: any): JSX.Element {
  const [window, setWindow] = useRecoilState(windowState);
  const handleScaleUp = () => {
    setWindow({
      ...window,
      width: WINDOW_HEIGHT,
      height: WINDOW_WIDTH,
      force: true,
      orientation: WINDOW_HEIGHT < (WINDOW_WIDTH / 2) * 3,
    });
    aniScreen(WINDOW_HEIGHT, WINDOW_WIDTH, 1);
  };
  const handleScaleDown = () => {
    aniScreen(WINDOW_WIDTH, videoHeight2, 0);
    setWindow({
      ...window,
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      force: false,
      orientation: WINDOW_HEIGHT < (WINDOW_WIDTH / 2) * 3,
    });
  };

  return (
    <View style={Styles(window.force).topBox}>
      <Text style={styles.topText}>0:00/15:20</Text>
      {window.force ? (
        <Pressable onPress={handleScaleDown}>
          <Image
            source={require('@/assets/video/screen-scaledown-24.png')}
            style={commonStyles.img}
          />
        </Pressable>
      ) : (
        <Pressable onPress={handleScaleUp}>
          <Image
            source={require('@/assets/video/screen-scaleup-24.png')}
            style={commonStyles.img}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topText: {
    color: 'white',
  },
});

const Styles = (ori: boolean) =>
  StyleSheet.create({
    topBox: {
      height: 24,
      paddingHorizontal: ori ? 0 : 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

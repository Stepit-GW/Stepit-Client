import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
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
import {MARGIN_HOR, WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';
import {useRecoilState} from 'recoil';
import {videoTutorialState} from '@/recoil/videoTutorialState';
import {windowState} from '@/recoil/windowState';
// import Video from 'react-native-video';

export default function Tutorial({img, aniTopFn}: any): JSX.Element {
  const startTop = WINDOW_HEIGHT - (WINDOW_WIDTH / 3) * 2;
  const [window] = useRecoilState(windowState);

  return (
    <View style={Styles(window.ipad, window.force).tutorialTitle}>
      <View />
      {img ? (
        <Pressable
          onPress={() => {
            aniTopFn(0, false);
          }}>
          <Image
            source={require('@/assets/video/arrow-top-24.png')}
            style={Styles(window.ipad, window.force).tutorialImg}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            aniTopFn(startTop - 100, true);
          }}>
          <Image
            source={require('@/assets/video/arrow-bottom-24.png')}
            style={Styles(window.ipad, window.force).tutorialImg}
          />
        </Pressable>
      )}
    </View>
  );
}

const Styles = (ipad: boolean, force: boolean) =>
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

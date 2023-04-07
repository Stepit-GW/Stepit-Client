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
import {MARGIN_HOR, MARGIN_VER, TOP_HEIGHT} from '@/static/commonValue';
import {useNavigation} from '@react-navigation/native';
import {windowState} from '@/recoil/windowState';
import BtnVideoMove from '@/components/video/BtnVideoMove';

export default function BtnVideoSetting({}: any): JSX.Element {
  const navigation = useNavigation<any>();

  const window = useRecoilValue(windowState);

  useEffect(() => {
    // console.log(window.width);
  }, [window]);

  return (
    <View style={Styles(window.force).bottomBox}>
      <View style={styles.bottomBtn}>
        <Image
          source={require('@/assets/video/mirror-mode-24.png')}
          style={commonStyles.img}
        />
        <Text style={styles.bottomText}>거울모드</Text>
      </View>
      <View style={styles.bottomBtn}>
        <Image
          source={require('@/assets/video/double-speed-24.png')}
          style={commonStyles.img}
        />
        <Text style={styles.bottomText}>배속(1.0x)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBtn: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    height: 25,
    marginLeft: 5,

    color: 'white',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 25,
  },
});

const Styles = (ori: boolean) =>
  StyleSheet.create({
    topBox: {
      height: 24,
      paddingHorizontal: ori ? 0 : MARGIN_HOR,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    bottomBox: {
      width: '100%',
      height: 25,
      marginBottom: 10,

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

      display: ori ? 'flex' : 'none',
    },
  });

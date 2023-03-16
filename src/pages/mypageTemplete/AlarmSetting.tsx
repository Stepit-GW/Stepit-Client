import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {PINK3, TOP_MARGIN} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import Title from '@/components/Title';
import Btn from '@/components/Btn';

export default function AlarmSetting({navigation}: any): JSX.Element {
  return (
    <SafeAreaView style={[commonStyles.container]}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <Title text="알림 설정" style={commonStyles.marginTop} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBox: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  img: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

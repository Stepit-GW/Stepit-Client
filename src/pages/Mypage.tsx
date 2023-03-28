import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import {commonStyles} from '@/styels/commonStyles';
import {
  GRAY,
  MARGIN_VER,
  PINK3,
  TOP_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';

export default function Mypage(): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}>
        <Text>Mypage</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

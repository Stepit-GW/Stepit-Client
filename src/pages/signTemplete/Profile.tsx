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
import {commonStyles} from '@/styels/commonStyles';
import {BTN_HEIGHT, GRAY, WINDOW_HEIGHT} from '@/static/commonValue';

export default function Profile(): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View
        style={[commonStyles.containerView, commonStyles.paddingHor]}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

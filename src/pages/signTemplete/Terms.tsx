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
import {commonStyles} from '@/styles/commonStyles';

export default function Terms({navigation}: any): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View
        style={[commonStyles.containerView, commonStyles.paddingHor]}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

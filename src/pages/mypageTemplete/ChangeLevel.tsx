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

export default function ChangeLevel(): JSX.Element {
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}>
        <Text>ChangeLevel</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

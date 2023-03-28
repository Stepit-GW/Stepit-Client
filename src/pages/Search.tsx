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
import {commonStyles} from '@/styels/commonStyles';

export default function Search(): JSX.Element {
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}>
        <Text>Search</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

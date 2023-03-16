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
import {useNavigation} from '@react-navigation/native';

export default function Title({text, style}: any): JSX.Element {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      style={[styles.topBox, {marginTop: TOP_MARGIN}, style]}
      onPress={() => {
        navigation.pop();
      }}>
      <Image source={require('@/assets/left.png')} style={styles.img} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.img} />
    </Pressable>
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

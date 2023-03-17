import React, {useEffect, useRef} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {MARGIN_VER, TOP_HEIGHT} from '@/static/commonValue';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from '@/styels/commonStyles';

export default function Title({text, style}: any): JSX.Element {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      style={[styles.topBox, style]}
      onPress={() => {
        navigation.pop();
      }}>
      <Image
        source={require('@/assets/notfound.png')}
        style={commonStyles.img}
      />
      <Text style={styles.text}>{text}</Text>
      <View style={commonStyles.img} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topBox: {
    height: TOP_HEIGHT,
    marginVertical: MARGIN_VER,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
});

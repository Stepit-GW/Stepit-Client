import {
  MARGIN_BOTTOM,
  MARGIN_HOR,
  PINK1,
  TOP_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
} from 'react-native';

export default function InputMessage({}: any): JSX.Element {
  return (
    <View style={commonStyles.paddingHor}>
      <View style={styles.inputBox}>
        <Image
          source={require('@/assets/notfound.png')}
          style={commonStyles.img}
        />
        <TextInput style={styles.textInput} />
        <Image
          source={require('@/assets/notfound.png')}
          style={[
            commonStyles.img,
            {position: 'absolute', top: 0, right: 0, zIndex: 1},
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    height: TOP_HEIGHT + 4,
    marginBottom: MARGIN_BOTTOM,

    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'flex-start',

    borderRadius: 15,
    borderWidth: 1,
    borderColor: PINK1,
  },
  textInput: {
    overflow: 'hidden',
  },
});

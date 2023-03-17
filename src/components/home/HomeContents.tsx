import {
  BTN_HEIGHT,
  MARGIN_HOR,
  PINK1,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeContents(): JSX.Element {
  const HomeData = [
    {title: 'title', contents: 'D-5'},
    {title: 'title', contents: 'D-5'},
    {title: 'title', contents: 'D-5'},
    {title: 'title', contents: 'D-5'},
    {title: 'title', contents: 'D-5'},
    {title: 'title', contents: 'D-5'},
    {title: 'title', contents: 'D-5'},
    {title: 'title', contents: 'D-5'},
    {title: 'title', contents: 'D-5'},
  ];
  return (
    <View style={styles.roomWrap}>
      {HomeData.map((data, idx) => {
        return (
          <View key={idx} style={styles.roomBox}>
            <Image
              source={require('@/assets/notfound.png')}
              style={styles.img}
            />
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.day}>{data.contents}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  roomWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  roomBox: {
    width: WINDOW_WIDTH / 2 - 10 - MARGIN_HOR,
    height: ((WINDOW_WIDTH / 2 - 10 - MARGIN_HOR) * 10) / 9,
    margin: 10,

    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'white',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {
          height: 5,
          width: 5,
        },
      },
      android: {
        shadowColor: '#000',
        elevation: 6,
      },
    }),
  },
  img: {
    width: '100%',
    height: 120,
  },

  title: {
    width: '100%',
    marginTop: 12,
    textAlign: 'center',
  },
  day: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

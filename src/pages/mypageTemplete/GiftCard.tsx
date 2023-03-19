import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {commonStyles} from '@/styels/commonStyles';
import Title from '@/components/Title';
import Btn from '@/components/Btn';
import {MARGIN_HOR, WINDOW_WIDTH} from '@/static/commonValue';

export default function GiftCard({navigation}: any): JSX.Element {
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
    <SafeAreaView style={[commonStyles.container]}>
      <View style={commonStyles.containerView}>
        <Title
          text="나의 선물 기록"
          style={[commonStyles.marginTop, commonStyles.paddingHor]}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 10}}>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  roomWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  roomBox: {
    // width: WINDOW_WIDTH / 3,
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

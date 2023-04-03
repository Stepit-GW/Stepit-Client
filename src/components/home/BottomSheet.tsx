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
import Title from '@/components/Title';
import {
  MARGIN_HOR,
  MARGIN_VER,
  TOP_HEIGHT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {homeDatas} from '@/static/home/homeDatas';
import {searchDatas} from '@/static/home/searchDatas';
// import Video from 'react-native-video';

export default function BottomSheet({aniTop, resultDatas}: any): JSX.Element {
  return (
    <Animated.View
      style={{
        width: '100%',
        height: WINDOW_HEIGHT,
        position: 'absolute',
        top: aniTop,
        backgroundColor: 'white',
      }}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollBox}>
          {resultDatas.map((data: any, idx: number) => {
            return (
              <View style={styles.video} key={idx}>
                <Text style={styles.videoTitle}>{data.title}</Text>
                <View style={styles.videoBottom}>
                  <Text style={styles.videoLeft}>{data.level}</Text>
                  <Text style={styles.videoRight}>{data.time}</Text>
                </View>
                <Image
                  source={require('@/assets/notfound.png')}
                  style={commonStyles.img100}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: MARGIN_VER + TOP_HEIGHT + 20,
  },
  scrollBox: {
    paddingHorizontal: MARGIN_HOR,

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  video: {
    width: 165,
    height: 220,
    marginBottom: 20,

    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'yellow',
  },

  videoTitle: {
    width: '100%',
    marginTop: 10,

    position: 'absolute',
    top: 0,

    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 10,

    zIndex: 900,
  },
  videoBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'absolute',
    bottom: 5,

    zIndex: 900,
    // backgroundColor: 'red',
  },
  videoLeft: {
    width: 24,
    paddingVertical: 4,
    marginLeft: 6,

    color: 'white',
    textAlign: 'center',

    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
  },
  videoRight: {
    marginRight: 6,
    color: 'white',
  },
});

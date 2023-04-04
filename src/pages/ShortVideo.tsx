import {bottomBarState} from '@/recoil/bottomBarState';
import {WINDOW_HEIGHT} from '@/static/commonValue';
import {shortVideoDatas} from '@/static/shortVideo/shortVideoDatas';
import {commonStyles} from '@/styles/commonStyles';
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
import {useRecoilValue} from 'recoil';

export default function ShortVideo({navigation}: any): JSX.Element {
  const bottomBar = useRecoilValue(bottomBarState);

  return (
    <>
      <ScrollView
        style={styles.screen}
        pagingEnabled
        scrollEventThrottle={200}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}>
        {shortVideoDatas.map((data: any, idx: number) => {
          return (
            <Pressable
              key={idx}
              onPress={() => {
                navigation.navigate('VideoDetail');
              }}>
              <View style={[commonStyles.paddingHor, styles.titleBox]}>
                <View style={styles.titleTop}>
                  <Text style={styles.level}>중</Text>
                  <Image
                    source={require('@/assets/heart-white-24.png')}
                    style={commonStyles.img}
                  />
                </View>

                <View style={styles.titleBottom}>
                  <Text style={styles.title}>르세라핌 - Antifragile</Text>
                  <Text style={styles.titleBtn}>배우기</Text>
                </View>
              </View>
              <Image
                source={require('@/assets/notfound.png')}
                style={Styles(bottomBar).screen}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: WINDOW_HEIGHT,
  },
  titleBox: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    zIndex: 900,
  },
  titleTop: {
    flexDirection: 'row',
  },
  level: {
    width: 24,
    marginRight: 14,
    marginBottom: 6,
    padding: 4,

    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',

    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
  },

  titleBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    lineHeight: 29,
    color: 'white',
    fontWeight: '800',
    fontSize: 24,
  },
  titleBtn: {
    width: 61,
    paddingVertical: 4,

    textAlign: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',

    color: 'white',
    fontWeight: '500',
    fontSize: 16,

    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },
});

const Styles = (bottomBar: number) =>
  StyleSheet.create({
    screen: {
      width: '100%',
      height: bottomBar,
    },
  });

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Pressable, Text} from 'react-native';
import {useRecoilValue} from 'recoil';
import {windowState} from '@/recoil/windowState';

export default function BtnVideoLine({
  videoRef,
  setVideoPause,
  currentTime,
  allTime,
  stopTime,
  rate,
  setRate,
  rateShow,
}: any): JSX.Element {
  const window = useRecoilValue(windowState);

  return (
    <View style={Styles(window.force).lineBox}>
      <View style={styles.line} />

      {rateShow ? (
        <>
          <View
            style={[
              styles.realLineBox,
              Styles(window.force).checkBottom,
              styles.rateLineBox,
              window.force && {top: -5},
            ]}>
            {[
              '0.25',
              '0.50',
              '0.75',
              '1.00',
              '1.25',
              '1.50',
              '1.75',
              '2.00',
            ].map((data: any, idx: number) => {
              return (
                <Pressable
                  key={idx}
                  style={[
                    styles.rateCircleBox,
                    idx === 0 && {marginLeft: 15},
                    idx === 7 && {marginRight: 15},
                  ]}
                  onPress={() => {
                    setRate(Number(data));
                  }}>
                  <Text style={styles.rateText}>
                    {data === 1
                      ? `${window.force ? `(기본)` : ``}`
                      : data + 'x'}
                  </Text>
                  <View
                    style={[
                      RateStyle(window.force, rate === Number(data)).rateCircle,
                    ]}
                  />
                </Pressable>
              );
            })}
          </View>
        </>
      ) : (
        <>
          <View style={styles.realLineBox}>
            <View style={{width: (currentTime / allTime) * 100 + '%'}}>
              <View style={styles.realLine} />
            </View>
          </View>
          <View style={[styles.realLineBox, Styles(window.force).checkBottom]}>
            <View style={{width: (currentTime / allTime) * 100 + '%'}}>
              <View style={Styles(window.force).circle} />
            </View>
          </View>
        </>
      )}

      {!rateShow &&
        stopTime !== undefined &&
        stopTime.map((data: any, idx: number) => {
          return (
            <Pressable
              key={idx}
              style={[styles.realLineBox, Styles(window.force).circleBottom]}
              onPress={() => {
                videoRef.current.seek(data.time);
                setTimeout(() => {
                  setVideoPause(true);
                }, 200);
              }}>
              <Image
                source={require('@/assets/video/check-22.png')}
                style={[
                  Styles(window.force).checks,
                  {
                    left: (data.time / allTime) * 100 + '%',
                  },
                ]}
              />
            </Pressable>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,

    opacity: 0.5,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'white',
  },

  rateLineBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rateLine: {
    width: '100%',
    position: 'absolute',
    borderWidth: 1,
  },
  rateText: {
    marginBottom: 5,
    color: 'white', //line
    fontWeight: '700',
  },
  rateCircleBox: {
    // width: 70,
    height: 30,
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  realLine: {
    borderWidth: 1,
    borderColor: 'white', //line
  },

  realLineBox: {
    width: '100%',
    paddingRight: 0,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
});

const Styles = (ori: boolean) =>
  StyleSheet.create({
    lineBox: {
      width: '100%',
      height: ori ? 24 : 10,
      marginBottom: ori ? 10 : 0,
      flexDirection: 'row',
    },

    circle: {
      width: ori ? 14 : 10,
      height: ori ? 14 : 10,
      alignSelf: 'flex-end',
      borderRadius: ori ? 14 : 10,
      backgroundColor: 'white', //line
    },
    checks: {
      width: ori ? 22 : 10,
      height: ori ? 22 : 10,
    },

    checkBottom: {
      position: 'absolute',
      bottom: ori ? -6 : -3,
      zIndex: 999,
    },
    circleBottom: {
      position: 'absolute',
      bottom: ori ? -10 : -3,
      zIndex: 999,
    },

    realLineBox: {
      width: '100%',
      paddingRight: 0,
      position: 'absolute',
      alignSelf: 'flex-end',
    },
  });

const RateStyle = (ori: boolean, rate: boolean) =>
  StyleSheet.create({
    rateCircle: {
      width: rate ? (ori ? 14 : 10) : 0,
      height: ori ? 14 : 10,

      borderWidth: 2,
      borderColor: 'white', //line
      borderRadius: ori ? 14 : 10,
      backgroundColor: 'white', //line
    },
  });

const RateStyle2 = (rate: boolean) =>
  StyleSheet.create({
    realLineBox: {
      width: '100%',
      paddingRight: 0,
      position: 'absolute',
      top: rate ? 0 : -5,
      alignSelf: 'flex-end',
    },
  });

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {MARGIN_HOR} from '@/static/commonValue';
import LinearGradient from 'react-native-linear-gradient';

export default function LinearGradientVideo({videoScreen}: any): JSX.Element {
  return (
    <LinearGradient
      colors={['transparent', 'transparent', 'white']}
      style={[commonStyles.screenImg, styles.linearGradient]}>
      <Text style={styles.title}>{videoScreen.title}</Text>

      <View style={styles.row}>
        {videoScreen.time !== undefined && (
          <>
            <Image
              source={require('@/assets/video/video-24.png')}
              style={commonStyles.img}
            />
            <Text style={styles.timeText}>
              &nbsp;
              {
                // videoScreen.time.split(':')[0] +
                //   '분 ' +
                videoScreen.time.split(':')[1] + '초'
              }
            </Text>
          </>
        )}
        {videoScreen.allTime !== undefined && (
          <>
            <Image
              source={require('@/assets/video/time-24.png')}
              style={[commonStyles.img, {marginLeft: 14}]}
            />
            <Text style={styles.timeText}>{videoScreen.allTime + '분'}</Text>
          </>
        )}
      </View>

      <View
        style={[
          styles.row,
          {marginBottom: 12, justifyContent: 'space-between'},
        ]}>
        {videoScreen.level !== undefined && (
          <View style={styles.row}>
            <View style={[styles.levelBox, {marginRight: 10}]}>
              <Text style={styles.level}>{videoScreen.level}</Text>
            </View>
          </View>
        )}
        <View style={styles.row}>
          {/* <Pressable
            onPress={() => {
              console.log('download');
            }}>
            <Image
              source={require('@/assets/download-white-24.png')}
              style={[commonStyles.img, {marginRight: 10}]}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              console.log('heart');
            }}>
            <Image
              source={require('@/assets/heart-white-24.png')}
              style={commonStyles.img}
            />
          </Pressable> */}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,

    position: 'absolute',

    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 901,
  },
  safeAreaView: {
    width: '100%',
    position: 'absolute',
    zIndex: 902,
  },
  linearGradient: {
    paddingHorizontal: MARGIN_HOR,
    flex: 1,
    justifyContent: 'flex-end',
  },

  title: {
    marginBottom: 10,
    lineHeight: 36,
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
  },
  timeText: {
    color: 'white',
    lineHeight: 19,
    fontWeight: '500',
    fontSize: 16,
  },
  row: {
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBox: {
    width: 36,
    height: 36,
    justifyContent: 'center',

    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 36,
  },
  level: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
  },

  scroll: {
    height: '100%',
    paddingHorizontal: MARGIN_HOR,
    backgroundColor: 'white',
  },
  screenImg: {
    position: 'absolute',
    zIndex: 900,
  },
});

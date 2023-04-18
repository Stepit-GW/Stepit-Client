import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useRecoilValue} from 'recoil';
import {windowState} from '@/recoil/windowState';

export default function BtnVideoLine({currentTime, allTime}: any): JSX.Element {
  const window = useRecoilValue(windowState);

  return (
    <View style={Styles(window.force).lineBox}>
      <View style={styles.line} />

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

      {/* <View style={[styles.realLineBox, Styles(window.force).circleBottom]}>
        <Image
          source={require('@/assets/video/check-22.png')}
          style={[Styles(window.force).checks, {marginLeft: '40%'}]}
        />
      </View>
      <View style={[styles.realLineBox, Styles(window.force).circleBottom]}>
        <Image
          source={require('@/assets/video/check-22.png')}
          style={[Styles(window.force).checks, {marginLeft: '80%'}]}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,

    opacity: 1,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'white',
  },
  realLineBox: {
    width: '100%',
    paddingRight: 0,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  realLine: {
    borderWidth: 1,
    borderColor: 'red',
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
      backgroundColor: 'red',
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
  });

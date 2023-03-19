import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import {commonStyles} from '@/styels/commonStyles';
import {
  GRAY,
  MARGIN_VER,
  PINK3,
  TOP_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';

export default function OtherProfile({setVisible}: any): JSX.Element {
  return (
    <View style={styles.profileBox}>
      <Pressable
        style={styles.profileBg}
        onPress={() => {
          setVisible(false);
        }}
      />
      <Animated.View
        style={[styles.topBg, {top: -157, left: -(478 - WINDOW_WIDTH) / 2}]}
      />
      <View style={styles.imgBox}>
        <Image source={require('@/assets/notfound.png')} style={styles.img} />
      </View>
      <Text style={styles.name}>배수지</Text>
      <View style={styles.instaBox}>
        <Image
          source={require('@/assets/insert-insta.png')}
          style={styles.instaImg}
        />
        <Text>skuukzky</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //
  profileBg: {
    width: '100%',
    height: '100%',

    position: 'absolute',
    opacity: 0.7,
    backgroundColor: 'white',
  },

  topBg: {
    width: 478,
    height: 447,

    position: 'absolute',
    borderRadius: 162,
    backgroundColor: PINK3,
  },

  box: {
    width: '100%',
    alignSelf: 'center',
  },
  imgBox: {
    width: 150,
    height: 150,
    marginTop: 175,

    overflow: 'hidden',
    alignSelf: 'center',

    borderRadius: 150,
    backgroundColor: GRAY,
  },
  img: {
    width: '100%',
    height: '100%',
  },

  name: {
    marginTop: 10,
    textAlign: 'center',

    fontSize: 25,
    fontWeight: '700',
  },
  instaBox: {
    marginTop: 10,
    marginBottom: 20,

    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  instaImg: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  profileBox: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 899,
  },
});

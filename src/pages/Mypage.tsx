import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import {commonStyles} from '@/styels/commonStyles';
import {GRAY, PINK3, WINDOW_WIDTH} from '@/static/commonValue';

export default function Mypage({navigation}: any): JSX.Element {
  const mypageData = [
    {
      text: '프로필 수정',
      img: require('@/assets/insert-insta.png'),
      Fn: () => {
        navigation.navigate('ProfileEdit');
      },
    },
    {
      text: '알림 설정',
      img: require('@/assets/my-setting.png'),
      Fn: () => {
        navigation.navigate('AlarmSetting');
      },
    },
    {
      text: '나의 선물 기록',
      img: require('@/assets/my-giftcard.png'),
      Fn: () => {
        navigation.navigate('GiftCard');
      },
    },
  ];

  const aniTop = useRef<Animated.Value>(new Animated.Value(-447)).current;
  const aniTopFn = (t: number) => {
    Animated.timing(aniTop, {
      toValue: t,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    aniTopFn(-157);
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <Animated.View
        style={[styles.topBg, {top: aniTop, left: -(478 - WINDOW_WIDTH) / 2}]}
      />
      <View style={styles.box}>
        <View style={styles.imgBox}>
          <Image source={require('@/assets/test.png')} style={styles.img} />
        </View>
        <Text style={styles.name}>배수지</Text>
        <View style={styles.instaBox}>
          <Image
            source={require('@/assets/insert-insta.png')}
            style={styles.instaImg}
          />
          <Text>skuukzky</Text>
        </View>
        {mypageData.map((data, idx) => {
          return (
            <Pressable
              key={idx}
              style={[styles.myBox, commonStyles.paddingHor]}
              onPress={data.Fn}>
              <Image source={data.img} style={styles.myImg} />
              <Text>{data.text}</Text>
              <Image
                source={require('@/assets/right.png')}
                style={styles.rightImg}
              />
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 20,
    marginBottom: 35,

    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  instaImg: {
    width: 15,
    height: 15,

    marginRight: 10,
  },

  myBox: {
    width: '100%',
    height: 20,
    marginBottom: 35,

    position: 'relative',
    flexDirection: 'row',
  },
  myImg: {
    width: 15,
    height: 15,
    marginRight: 15,
  },
  rightImg: {
    width: 13,
    height: 13,

    position: 'absolute',
    right: 38,
  },
});

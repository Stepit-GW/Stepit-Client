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
import {
  GRAY,
  MARGIN_VER,
  PINK3,
  TOP_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import Title from '@/components/Title';
import {commonStyles} from '@/styles/commonStyles';
import {mypageRoutesData} from '@/static/mypageRoutesData';

export default function Mypage({navigation}: any): JSX.Element {
  const mypageCnt = mypageRoutesData.length;

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <Title
          style={{marginTop: MARGIN_VER}}
          leftComponent={<></>}
          rightComponent={
            <Pressable
              onPress={() => {
                navigation.navigate(mypageRoutesData[mypageCnt - 1].navi);
              }}>
              <Image
                source={mypageRoutesData[mypageCnt - 1].img}
                style={commonStyles.img}
              />
            </Pressable>
          }
        />
        <View style={styles.contents}>
          <View style={styles.imgBox}>
            <Image
              source={require('@/assets/mypage/profile-100.png')}
              style={styles.img}
            />
            <Image
              source={require('@/assets/mypage/profile-add-20.png')}
              style={styles.rightImg}
            />
          </View>

          <View style={styles.textBox}>
            <View style={commonStyles.img} />
            <Text style={styles.text}>{'@' + 'aaaaaaaaaaaaaaa'}</Text>
            <Image
              source={require('@/assets/mypage/pencil-24.png')}
              style={commonStyles.img}
            />
          </View>

          {mypageRoutesData.map((data: any, idx: number) => {
            return (
              mypageCnt !== idx + 1 && (
                <Pressable
                  key={idx}
                  style={styles.mypageBox}
                  onPress={() => {
                    navigation.navigate(data.navi);
                  }}>
                  <View style={styles.mypageLeft}>
                    <Image source={data.img} style={commonStyles.img} />
                    <Text>{data.title}</Text>
                  </View>
                  <Image
                    source={require('@/assets/mypage/arrow-gray-24.png')}
                    style={commonStyles.img}
                  />
                </Pressable>
              )
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contents: {
    flex: 1,
    width: '100%',
    paddingTop: 60,

    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'red',
  },

  imgBox: {
    width: 100,
    height: 100,
    marginBottom: 30,

    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  rightImg: {
    width: 20,
    height: 20,

    position: 'absolute',
    right: 5,
    bottom: 0,
    zIndex: 900,
  },

  textBox: {
    height: 24,
    marginBottom: 60,

    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  text: {
    color: '#000',
    fontWeight: '400',
    fontSize: 14,
  },

  mypageBox: {
    width: '100%',
    height: 24,
    marginVertical: 18,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mypageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

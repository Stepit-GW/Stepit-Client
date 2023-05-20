import React, {useEffect, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import {MARGIN_VER} from '@/static/commonValue';
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
    color: 'black',
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
  mypageText: {
    marginLeft: 25,
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
});

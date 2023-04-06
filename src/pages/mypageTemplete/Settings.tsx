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
import {useNavigation} from '@react-navigation/native';
import Title from '@/components/Title';
import {MARGIN_VER} from '@/static/commonValue';
import Switch from '@/components/Switch';

export default function Settings(): JSX.Element {
  const navigation = useNavigation<any>();

  const [switchDatas, setSwitchDatas] = useState([
    {title: '알림 설정', tf: false},
    {title: 'Wi-Fi에서만 재생', tf: false},
    {title: 'Wi-Fi에서만 다운로드', tf: false},
  ]);
  const [resolution, setResolution] = useState(true);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <Title
          style={{marginTop: MARGIN_VER}}
          leftComponent={
            <Pressable
              onPress={() => {
                navigation.pop();
              }}>
              <Image
                source={require('@/assets/arrow-black-24.png')}
                style={commonStyles.img}
              />
            </Pressable>
          }
          rightComponent={<></>}
        />
        {switchDatas.map((data: any, idx: number) => {
          return (
            <View key={idx} style={styles.switch}>
              <Text style={styles.text}>{data.title}</Text>
              <Switch
                idx={idx}
                switchDatas={switchDatas}
                setSwitchDatas={setSwitchDatas}
              />
            </View>
          );
        })}
        <Text style={[styles.text, {marginBottom: 12}]}>해상도 설정</Text>
        <Pressable
          style={styles.box}
          onPress={() => {
            setResolution(true);
          }}>
          <Text style={{color: 'black'}}>스탠다드</Text>
          {resolution && (
            <Image
              source={require('@/assets/mypage/check-30.png')}
              style={styles.img}
            />
          )}
        </Pressable>
        <Pressable
          style={styles.box}
          onPress={() => {
            setResolution(false);
          }}>
          <Text style={{color: 'black'}}>고화질</Text>
          {!resolution && (
            <Image
              source={require('@/assets/mypage/check-30.png')}
              style={styles.img}
            />
          )}
        </Pressable>

        <Text style={[styles.text, {marginTop: 30}]}>로그아웃</Text>
        <Text style={styles.text}>탈퇴</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    lineHeight: 17,

    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  switch: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  box: {
    height: 30,
    marginVertical: 4,
    paddingLeft: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: 30,
    height: 30,
  },
});

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
    {title: '알림 설정', tf: true},
    {title: 'Wi-Fi에서만 재생', tf: true},
    {title: 'Wi-Fi에서만 다운로드', tf: true},
  ]);

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
        <Text style={styles.text}>해상도 설정</Text>
        <View style={styles.box}>
          <Text>스탠다드</Text>
          <Image
            source={require('@/assets/mypage/check-30.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.box}>
          <Text>고화질</Text>
          <Image
            source={require('@/assets/mypage/check-30.png')}
            style={styles.img}
          />
        </View>
        <Text style={styles.text}>로그아웃</Text>
        <Text style={styles.text}>탈퇴</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 17,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  switch: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: 30,
    height: 30,
  },
});

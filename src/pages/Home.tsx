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
import {
  GRAY,
  MARGIN_HOR,
  MARGIN_VER,
  PINK0,
  PINK3,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import Charbar1 from '@/components/home/Chatbar1';
import Charbar2 from '@/components/home/Charbar2';
import HomeContents from '@/components/home/HomeContents';
import ModalRoomDetail from '@/components/home/ModalRoomDetail';

export default function Home({navigation}: any): JSX.Element {
  const [visible, setVisible] = useState(false);

  const aniHeight = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniLeftRight = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniMargin = useRef<Animated.Value>(
    new Animated.Value(WINDOW_HEIGHT / 2.2),
  ).current;
  const aniSearchFn = (h: number, m: number, lf: number, o: number) => {
    Animated.timing(aniHeight, {
      toValue: h,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniMargin, {
      toValue: m,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniLeftRight, {
      toValue: lf,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(aniOpacity, {
      toValue: o,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const isValidToken = async (refreshToken: string) => {
    // await axios
    //   .get('http://54.180.188.181:8080/api/auth/validity', {
    //     params: {refreshToken: refreshToken},
    //   })
    //   .then(({data}) => data)
    //   .catch(err => console.log(err.response));
  };

  const [test, setTest] = useState(true);
  const getToken = async () => {
    // const refresh = await AsyncStorage.getItem('refreshToken');
    // if (refresh !== null) {
    //   const data = JSON.parse(refresh);
    //   if (!isValidToken(data)) {
    //     navigation.navigate('Logo');
    //   }
    // } else {
    //   navigation.navigate('Logo');
    // }
    if (test) {
    } else navigation.navigate('Logo');
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

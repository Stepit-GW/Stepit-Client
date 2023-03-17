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

export default function Home({navigation}: any): JSX.Element {
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
      <View style={commonStyles.containerView}>
        <Animated.View style={{left: aniLeftRight}}>
          <Charbar1 time={500} />
        </Animated.View>

        <Animated.View style={{right: aniLeftRight}}>
          <Charbar2 time={1200} />
        </Animated.View>

        <Pressable
          onPress={() => {
            aniSearchFn(0, WINDOW_HEIGHT / 2.2, 0, 0);
          }}>
          <Animated.View style={[styles.back, {opacity: aniOpacity}]} />
        </Pressable>
        <Animated.View style={[styles.search, {marginTop: aniMargin}]}>
          <Text style={styles.gifto}>GIFTo.</Text>
          <TextInput
            style={styles.input}
            onPressIn={() => {
              aniSearchFn(WINDOW_HEIGHT, MARGIN_VER, -WINDOW_WIDTH, 1); //WINDOW_HEIGHT / 15
            }}
          />
        </Animated.View>

        <Animated.View
          style={{
            height: aniHeight,
            flex: aniOpacity,
            backgroundColor: 'white',
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingHorizontal: MARGIN_HOR - 10}}>
            <HomeContents />
          </ScrollView>
        </Animated.View>

        <Animated.View style={[styles.bottomText, {marginTop: aniMargin}]}>
          <Text style={styles.text}>
            선물 대상의 instagram ID를 검색해보세요.
          </Text>
          <Text style={styles.subText}>
            <Text style={styles.textColor}>함께</Text> 모아{' '}
            <Text style={styles.textColor}>선물</Text>하세요!
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    width: 310,
    height: 48,
    paddingHorizontal: 11,

    overflow: 'hidden',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',

    borderWidth: 2,
    borderColor: PINK3,
    borderRadius: 18,
    backgroundColor: 'white',
    zIndex: 999,
  },
  gifto: {
    color: PINK0,
    fontWeight: '600',
    fontSize: 20,
  },
  input: {
    width: '100%',
    height: '100%',
    marginLeft: 5,
  },

  back: {
    width: 36,
    height: 36,

    position: 'absolute',
    top: MARGIN_VER + 6,
    // left: MARGIN_HOR,
    backgroundColor: 'red',
  },

  text: {
    marginVertical: 16,
    fontSize: 12,
    color: '#555',
    alignSelf: 'center',
  },
  subText: {
    marginVertical: 16,
    fontSize: 14,
    alignSelf: 'center',
  },
  textColor: {
    color: PINK0,
  },

  bottomText: {
    position: 'absolute',
    paddingTop: 48,
    alignSelf: 'center',
    zIndex: -1,
  },
});

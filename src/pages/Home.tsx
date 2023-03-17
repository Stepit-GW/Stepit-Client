import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  GRAY,
  PINK0,
  PINK3,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import Charbar1 from '@/components/home/Chatbar1';
import Charbar2 from '@/components/home/Charbar2';

export default function Home({navigation}: any): JSX.Element {
  const aniOpacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniOpacityFn = (o: number) => {
    Animated.timing(aniOpacity, {
      toValue: o,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const aniLeftRight = useRef<Animated.Value>(new Animated.Value(0)).current;
  const aniMargin = useRef<Animated.Value>(
    new Animated.Value(WINDOW_HEIGHT / 2.2),
  ).current;
  const aniSearchFn = (m: number, lf: number) => {
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
          <Charbar2 time={1000} />
        </Animated.View>

        <Pressable
          onPress={() => {
            aniSearchFn(WINDOW_HEIGHT / 2.2, 0);
            aniOpacityFn(0);
          }}>
          <Animated.View style={[styles.back, {opacity: aniOpacity}]} />
        </Pressable>
        <Animated.View style={[styles.search, {marginTop: aniMargin}]}>
          <Text style={styles.gifto}>GIFTo.</Text>
          <TextInput
            style={styles.input}
            onPressIn={() => {
              aniSearchFn(WINDOW_HEIGHT / 15, -WINDOW_WIDTH);
              aniOpacityFn(1);
            }}
          />
          {/* <Text>a</Text> */}
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
  },
  gifto: {
    color: PINK0,
    fontWeight: '400',
    fontSize: 20,
  },
  input: {
    width: '100%',
    height: '100%',
    marginLeft: 5,
  },

  back: {
    width: 48,
    height: 48,

    position: 'absolute',
    top: WINDOW_HEIGHT / 15,
    backgroundColor: 'red',
  },
});

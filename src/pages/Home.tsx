import React, {useEffect, useRef} from 'react';
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
  PINK2,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import Charbar1 from '@/components/home/Chatbar1';
import Charbar2 from '@/components/home/Charbar2';

export default function Home(): JSX.Element {
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
    new Animated.Value(SCREEN_HEIGHT / 2.2),
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

  useEffect(() => {
    setTimeout(() => {
      // aniCharbarFn(SCREEN_HEIGHT / 15, 1);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}>
        <Animated.View style={{left: aniLeftRight}}>
          <Charbar1 time={1000} />
        </Animated.View>

        <Animated.View style={{right: aniLeftRight}}>
          <Charbar2 time={2000} />
        </Animated.View>

        <Pressable
          onPress={() => {
            aniSearchFn(SCREEN_HEIGHT / 2.2, 0);
            aniOpacityFn(0);
          }}>
          <Animated.View style={[styles.back, {opacity: aniOpacity}]} />
        </Pressable>
        <Animated.View style={[styles.search, {marginTop: aniMargin}]}>
          <Text style={styles.gifto}>GIFTo.</Text>
          <TextInput
            style={styles.input}
            onPressIn={() => {
              aniSearchFn(SCREEN_HEIGHT / 15, -SCREEN_WIDTH);
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
    borderColor: PINK2,
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
    top: SCREEN_HEIGHT / 15,
    backgroundColor: 'red',
  },
});

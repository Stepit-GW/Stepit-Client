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
import Title from '@/components/Title';
import {MARGIN_VER, WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function VideoDetail(): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={['transparent', 'white']}
          style={commonStyles.screenImg}></LinearGradient>
      </View>
      <Image
        source={require('@/assets/notfound.png')}
        style={[commonStyles.screenImg, styles.screenImg]}
      />

      <View style={styles.scrollBox}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <Text>Hi</Text>
        </ScrollView>
      </View>

      <SafeAreaView
        style={[
          // commonStyles.marginHor,
          {
            width: '100%',
            height: WINDOW_HEIGHT,
            position: 'absolute',
            zIndex: 902,
          },
        ]}>
        <View>
          <Title
            style={[commonStyles.paddingHor, {marginTop: MARGIN_VER}]}
            leftComponent={
              <Pressable
                onPress={() => {
                  navigation.pop();
                }}>
                <Image
                  source={require('@/assets/arrow-white-24.png')}
                  style={commonStyles.img}
                />
              </Pressable>
            }
            rightComponent={
              <Pressable
                onPress={() => {
                  navigation.pop();
                }}>
                <Image
                  source={require('@/assets/screen-scaleup-24.png')}
                  style={commonStyles.img}
                />
              </Pressable>
            }
          />

          {/* <View
            style={{width: '100%', height: '100%', backgroundColor: 'red'}}
          /> */}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,

    position: 'absolute',

    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 901,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollBox: {
    flex: 1,
    paddingTop: (WINDOW_WIDTH / 10) * 11,
    backgroundColor: 'white',
  },
  scroll: {
    paddingTop: 20,
    paddingBottom: 30,
  },

  screenImg: {
    position: 'absolute',
    zIndex: 900,
  },
});

import React, {useEffect, useRef} from 'react';
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
import {commonStyles} from '@/styels/commonStyles';
import Title from '@/components/Title';
import Btn from '@/components/Btn';
import {PINK0, PINK3, PINK4, WINDOW_WIDTH} from '@/static/commonValue';

export default function ChatGiftCard({navigation}: any): JSX.Element {
  const imgs = ['', '', '', '', '', ''];
  return (
    <SafeAreaView style={[commonStyles.container]}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <Pressable
          style={styles.topBox}
          onPress={() => {
            navigation.pop();
          }}>
          <Image
            source={require('@/assets/notfound.png')}
            style={commonStyles.img}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>GIFTo. </Text>
            <TextInput style={styles.titleInput} />
            <Image source={require('@/assets/notfound.png')} />
          </View>
          <View style={commonStyles.img} />
        </Pressable>

        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.cardImgsScroll}>
            {imgs.map((data, idx) => {
              return (
                <Pressable
                  key={idx}
                  style={[
                    styles.cardImgBox,
                    {marginRight: imgs.length - 1 === idx ? 0 : 10},
                  ]}
                  onPress={() => {}}>
                  <Image
                    source={require('@/assets/notfound.png')}
                    style={styles.img}
                  />
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.mainImg}>
          <Image source={require('@/assets/notfound.png')} style={styles.img} />
        </View>

        <TextInput placeholder="생일 축하해요!" style={styles.input} />

        <Btn text={'등록'} style={{marginTop: 0, marginBottom: 0}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBox: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    alignSelf: 'center',
    color: PINK0,
    fontSize: 16,
    fontWeight: '700',
  },

  titleInput: {
    width: 60,
  },

  cardImgsScroll: {
    marginTop: 50,
    marginBottom: 24,
    flexDirection: 'row',
  },
  cardImgBox: {
    width: 70,
    height: 60,

    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: PINK3,
  },
  img: {
    width: '100%',
    height: '100%',
  },

  mainImg: {
    width: '100%',
    height: (WINDOW_WIDTH * 2) / 3,
    overflow: 'hidden',
    borderRadius: 15,
  },

  input: {
    width: '100%',
    height: 100,
    marginVertical: 33,
    paddingHorizontal: 24,

    borderRadius: 15,
    backgroundColor: PINK4,
  },
});

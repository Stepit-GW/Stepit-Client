import React, {useRef, useState} from 'react';
import {
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  Animated,
} from 'react-native';
import {commonStyles} from '@/styels/commonStyles';
import Title from '@/components/Title';
import {
  GRAY,
  MARGIN_HOR,
  MARGIN_VER,
  PINK3,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import InputMessage from '@/components/chat/InputMessage';
import SideMenuChild from '@/components/chat/SideMenuChild';
import OtherProfile from '@/components/chat/OtherProfile';

const HiData = [
  {name: 'My', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'My', chat: 'Hi1'},
  {name: 'My', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'My', chat: 'Hi1'},
  {name: 'My', chat: 'Hi1'},
  {name: 'My', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'a', chat: 'Hi1'},
  {name: 'My', chat: 'Hi1'},
  {name: 'My', chat: 'Hi1'},
];

const SIDEBAR_WIDTH = (WINDOW_WIDTH * 3) / 4;

export default function Chatting(): JSX.Element {
  const ref = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  const [bgVisible, setBgVisible] = useState(false);
  const [scrollH, setScrollH] = useState<number>(0);

  const aniRight = useRef<Animated.Value>(
    new Animated.Value(-SIDEBAR_WIDTH),
  ).current;
  const aniRightFn = (r: number) => {
    Animated.timing(aniRight, {
      toValue: r,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.containerView}>
          {visible && <OtherProfile setVisible={setVisible} />}
          <Title text="채팅방 이름" style={commonStyles.marginHor} />
          <View style={styles.right}>
            <Image
              source={require('@/assets/notfound.png')}
              style={commonStyles.img}
            />
            <Pressable
              onPress={() => {
                aniRightFn(0);
                setBgVisible(true);
              }}>
              <Image
                source={require('@/assets/notfound.png')}
                style={commonStyles.img}
              />
            </Pressable>
          </View>
          <View style={styles.hr} />

          <ScrollView
            contentOffset={{y: HiData.length * 40}}
            // onScrollEndDrag={true}
            showsVerticalScrollIndicator={false}
            style={[commonStyles.marginHor, styles.content]}>
            {HiData.map((data, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    flexDirection: data.name === 'My' ? 'row' : 'row-reverse',
                  }}>
                  <Pressable
                    onPress={() => {
                      setVisible(true);
                    }}>
                    <Image
                      source={require('@/assets/notfound.png')}
                      style={[commonStyles.img, styles.img]}
                    />
                  </Pressable>
                  <Text>{data.chat}</Text>
                </View>
              );
            })}
          </ScrollView>

          <InputMessage />

          {bgVisible && <View style={styles.sideBarBack} />}
          <Animated.View
            onTouchStart={e => {
              setScrollH(e.nativeEvent.pageX);
            }}
            onTouchMove={e => {
              const move = e.nativeEvent.pageX;
              if (scrollH - move < 0) {
                aniRightFn(-SIDEBAR_WIDTH);
                setBgVisible(false);
              }
            }}
            style={[styles.sideBar, {right: aniRight}]}>
            <SideMenuChild />
          </Animated.View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
  },
  content: {
    flex: 1,
    marginVertical: MARGIN_VER,
  },

  right: {
    marginTop: MARGIN_VER,
    flexDirection: 'row',
    position: 'absolute',
    right: MARGIN_HOR,
  },
  img: {
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 40,
  },

  sideBar: {
    width: SIDEBAR_WIDTH,
    height: '100%',

    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 901,
  },

  sideBarBack: {
    width: '100%',
    height: '100%',

    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.3,
    zIndex: 900,
  },
});

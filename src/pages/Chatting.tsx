import React, {useRef} from 'react';
import {
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {commonStyles} from '@/styels/commonStyles';
import Title from '@/components/Title';
import {GRAY, MARGIN_HOR, MARGIN_VER} from '@/static/commonValue';
import InputMessage from '@/components/chat/InputMessage';

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

export default function Chatting(): JSX.Element {
  const ref = useRef<any>(null);
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}>
        <Title text="채팅방 이름" style={commonStyles.marginHor} />
        <View style={styles.right}>
          <Image
            source={require('@/assets/test-item.png')}
            style={commonStyles.img}
          />
          <Image
            source={require('@/assets/test-item.png')}
            style={commonStyles.img}
          />
        </View>
        <View style={styles.hr} />

        <ScrollView
          contentOffset={{y: HiData.length * 40}}
          showsVerticalScrollIndicator={false}
          style={[commonStyles.marginHor, styles.content]}>
          {HiData.map((data, idx) => {
            return (
              <View
                key={idx}
                style={{
                  flexDirection: data.name === 'My' ? 'row' : 'row-reverse',
                }}>
                <Image
                  source={require('@/assets/test-item.png')}
                  style={[commonStyles.img, styles.img]}
                />
                <Text>{data.chat}</Text>
              </View>
            );
          })}
        </ScrollView>

        <InputMessage />
      </View>
    </SafeAreaView>
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
});

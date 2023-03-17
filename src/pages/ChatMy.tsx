import {MARGIN_VER, TOP_HEIGHT} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function ChatMy({navigation}: any): JSX.Element {
  const chatData = [
    {
      img: require('@/assets/test.png'),
      title: 'title',
      contents: 'contents',
    },
    {
      img: require('@/assets/test.png'),
      title: 'title',
      contents: 'contents',
    },
    {
      img: require('@/assets/test.png'),
      title: 'title',
      contents: 'contents',
    },
  ];
  return (
    <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {chatData.map((data, idx) => {
          return (
            <Pressable
              key={idx}
              style={styles.chatBox}
              onPress={() => {
                navigation.navigate('Chatting');
              }}>
              <Image source={data.img} style={styles.img} />
              <View style={styles.chatBoxIn}>
                <Text>{data.title}</Text>
                <Text>{data.contents}</Text>
              </View>
              <View style={styles.timeNum}>
                <Text>time</Text>
                <Text>num</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },

  chatBox: {
    marginVertical: TOP_HEIGHT / 2,
    flexDirection: 'row',
    position: 'relative',
  },
  chatBoxIn: {
    width: '100%',
  },

  timeNum: {
    position: 'absolute',
    right: 0,
  },
});

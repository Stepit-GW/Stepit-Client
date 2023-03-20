import {MARGIN_VER, PINK2, TOP_HEIGHT} from '@/static/commonValue';
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
      img: require('@/assets/notfound.png'),
      title: 'title',
      contents: 'contents',
    },
    {
      img: require('@/assets/notfound.png'),
      title: 'title',
      contents: 'contents',
    },
    {
      img: require('@/assets/notfound.png'),
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
                <Text style={styles.title}>{data.title}</Text>
                <Text>{data.contents}</Text>
              </View>
              <View style={styles.timeNum}>
                <Text>4:27</Text>
                <View style={styles.numBox}>
                  <Text style={styles.num}>20</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chatRoom: {},
  scroll: {
    flex: 1,
  },
  img: {
    width: 45,
    height: 45,
    marginRight: 15,
    borderRadius: 50,
  },

  chatBox: {
    marginVertical: TOP_HEIGHT / 2,
    position: 'relative',
    flexDirection: 'row',
  },
  chatBoxIn: {
    width: '100%',
    alignSelf: 'center',
  },

  title: {
    marginBottom: 2,
    fontSize: 15,
    fontWeight: '600',
  },

  timeNum: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
  },
  numBox: {
    width: 20,
    height: 20,
    marginTop: 4,

    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: PINK2,
  },
  num: {
    lineHeight: 20,
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

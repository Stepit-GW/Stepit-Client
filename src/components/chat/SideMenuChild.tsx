import {
  BTN_HEIGHT,
  MARGIN_HOR,
  PINK1,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Btn from '@/components/Btn';

const SIDEBAR_WIDTH = (WINDOW_WIDTH * 3) / 4;

export default function SideMenuChild(): JSX.Element {
  const navigation = useNavigation<any>();
  const participant = [
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
    {name: 'Hi'},
  ];

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.box}
        onPress={() => {
          navigation.navigate('RoomCRUD', {id: 1});
        }}>
        <Text>채팅방 정보</Text>
        <Image source={require('@/assets/notfound.png')} />
      </Pressable>
      <Pressable
        style={styles.box}
        onPress={() => {
          navigation.navigate('ChatGiftCard');
        }}>
        <Text>선물 카드</Text>
        <Image source={require('@/assets/notfound.png')} />
      </Pressable>

      <View style={styles.box}>
        <Text>참여자</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {participant.map((data, idx) => {
          return (
            <View key={idx} style={styles.participant}>
              <Text>{data.name}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={{marginHorizontal: 12}}>
        <Btn text={'모집 마감 하기'} style={{marginBottom: 8}} />
      </View>
      <View style={styles.bottom}>
        <Image source={require('@/assets/notfound.png')} />
        <Image source={require('@/assets/notfound.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIDEBAR_WIDTH,
    paddingVertical: 10,
    height: '100%',
  },
  box: {
    width: SIDEBAR_WIDTH,
    height: 50,
    paddingHorizontal: 12,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  scroll: {
    flex: 1,
    width: SIDEBAR_WIDTH,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  participant: {
    height: 40,
    marginVertical: 10,
  },

  bottom: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

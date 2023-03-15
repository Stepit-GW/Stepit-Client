import {PINK1, PINK2} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

const dataAlarm = Array(20)
  .fill('')
  .map((_, i) => ({key: `${i}`, text: `item #${i}`}));

export default function Alarm(): JSX.Element {
  const [text, setText] = useState('Not Pressed');

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}>
        <Text style={[commonStyles.title, commonStyles.marginTop]}>알림</Text>
        {/* <View style={{height: 42}} /> */}
        <SwipeListView
          data={dataAlarm}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={[commonStyles.paddingHor, styles.swipeListItem]}>
              <Text style={styles.title}>{item.text}</Text>
              <Text style={styles.contents}>{item.text}</Text>
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <Pressable
              onPress={() => setText(`${data.item.text} right is pressed`)}>
              <View style={[styles.swipeHiddenItem]}>
                <Text style={styles.swipeHiddenItemText}>삭제</Text>
              </View>
            </Pressable>
          )}
          leftOpenValue={0}
          rightOpenValue={-109}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styledText: {
    color: '#111',
    fontWeight: 'bold',
  },
  swipeListItem: {
    height: 90,
    backgroundColor: 'white',
  },

  title: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: '700',
  },
  contents: {
    marginTop: 13,
    color: '#D4D4D4',
    fontSize: 11,
    fontWeight: '400',
  },

  swipeHiddenItem: {
    width: '100%',
    height: 90,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: PINK2,
  },
  swipeHiddenItemText: {
    width: 109,

    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
});

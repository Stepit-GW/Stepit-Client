import {commonStyles} from '@/styels/commonStyles';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

export default function ChatMy(): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView, commonStyles.marginHor]}>
        <Text style={styles.chat}>채팅</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chat: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
});

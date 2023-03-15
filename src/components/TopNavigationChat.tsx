import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {bottomRoutesData} from '@/static/bottomRoutesData';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChatAll from '@/pages/ChatAll';
import ChatMy from '@/pages/ChatMy';
import {commonStyles} from '@/styels/commonStyles';

const Tab = createMaterialTopTabNavigator();

export default function TopNavigationChat(): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View
        style={[
          commonStyles.containerView,
          commonStyles.marginHor,
          commonStyles.marginTop,
        ]}>
        <Text style={commonStyles.title}>채팅</Text>
        <Tab.Navigator initialRouteName="ChatAll">
          <Tab.Screen name="전체" component={ChatAll} />
          <Tab.Screen name="내가 만든 방" component={ChatMy} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chat: {},
});

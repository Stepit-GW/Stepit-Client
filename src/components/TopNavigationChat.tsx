import React, {useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {bottomRoutesData} from '@/static/bottomRoutesData';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChatAll from '@/pages/ChatAll';
import ChatMy from '@/pages/\bChatMy';

const Tab = createMaterialTopTabNavigator();

export default function TopNavigationChat(): JSX.Element {
  return (
    <Tab.Navigator initialRouteName="ChatAll">
      <Tab.Screen name="전체" component={ChatAll} />
      <Tab.Screen name="내가 만든 방" component={ChatMy} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

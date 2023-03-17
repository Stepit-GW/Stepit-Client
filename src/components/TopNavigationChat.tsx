import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {bottomRoutesData} from '@/static/bottomRoutesData';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChatAll from '@/pages/ChatAll';
import ChatMy from '@/pages/ChatMy';
import {commonStyles} from '@/styels/commonStyles';
import {MARGIN_HOR} from '@/static/commonValue';

const Tab = createMaterialTopTabNavigator();

export default function TopNavigationChat(): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}>
        <Text style={commonStyles.title}>채팅</Text>
        <Tab.Navigator
          initialRouteName="ChatAll"
          screenOptions={{
            // tabBarActiveTintColor: '#009688',
            // tabBarItemStyle: {width: 100},
            tabBarLabelStyle: {
              fontSize: 16,
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#000',
            },
            tabBarStyle: {
              marginHorizontal: MARGIN_HOR,
              elevation: 0,
            },
          }}>
          <Tab.Screen name="전체" component={ChatAll} />
          <Tab.Screen name="내가 만든 방" component={ChatMy} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

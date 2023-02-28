import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Search from './pages/Search';
import Insert from './pages/Insert';
import Chat from './pages/Chat';

const Tab = createBottomTabNavigator();

export default function BottomNavigation(): JSX.Element {
  return (
    <Tab.Navigator initialRouteName="Search">
      <Tab.Screen
        options={{title: '검색', headerShown: false}}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{title: '글쓰기', headerShown: false}}
        name="Insert"
        component={Insert}
      />
      <Tab.Screen
        options={{title: '채팅', headerShown: false}}
        name="Chat"
        component={Chat}
      />
    </Tab.Navigator>
  );
}

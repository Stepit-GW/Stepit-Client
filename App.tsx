/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import BottomNavigation from './src/components/BottomNavigation';
import Mypage from './src/pages/Mypage';
import TopChatNavigation from '@/components/TopNavigationChat';
import Chatting from '@/pages/Chatting';
import Logo from '@/pages/Logo';
import {signRoutesData} from '@/static/signRoutesData';
import {mypageRoutesData} from '@/static/mypageRoutesData';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Logo"
          component={Logo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chatting"
          component={Chatting}
          options={{headerShown: false}}
        />

        {signRoutesData.map((data: any, idx: number) => {
          return (
            <Stack.Screen
              key={idx}
              name={data.name}
              component={data.component}
              options={{headerShown: false}}
            />
          );
        })}

        {mypageRoutesData.map((data: any, idx: number) => {
          return (
            <Stack.Screen
              key={idx}
              name={data.name}
              component={data.component}
              options={{headerShown: false}}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
import {signRoutesData} from '@/static/signRoutesData';
import {mypageRoutesData} from '@/static/mypageRoutesData';
import VideoInfo from '@/pages/VideoInfo';
import {RecoilRoot} from 'recoil';
import VideoDetail from '@/pages/VideoDetail';
import ModalVideo from '@/components/ModalVideo';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    // <SafeAreaView style={commonStyles.container}>
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={BottomNavigation}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="VideoInfo"
            component={VideoInfo}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="VideoDetail"
            component={VideoDetail}
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

        <ModalVideo />
      </NavigationContainer>
    </RecoilRoot>
    // </SafeAreaView>
  );
}

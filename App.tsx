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
import {commonStyles} from '@/styels/commonStyles';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <SafeAreaView style={commonStyles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={BottomNavigation}
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

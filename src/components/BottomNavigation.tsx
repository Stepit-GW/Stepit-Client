import React, {useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {bottomRoutesData} from '@/static/bottomRoutesData';

const Tab = createBottomTabNavigator();

export default function BottomNavigation(): JSX.Element {
  return (
    <Tab.Navigator initialRouteName="Home">
      {bottomRoutesData.map((data: any, idx: number) => {
        return (
          <Tab.Screen
            key={idx}
            options={{
              headerShown: false,
              tabBarStyle: {
                height: 65,
              },
              tabBarLabel: ({focused}) => (
                <Text
                  style={{fontSize: 12, color: focused ? '#F7CBD9' : 'gray'}}>
                  {data.name}
                </Text>
              ),
              tabBarIcon: ({focused}: any) => {
                return (
                  <Image
                    source={focused ? data.act : data.none}
                    style={styles.bottomImg}
                  />
                );
              },
            }}
            listeners={({navigation}) => ({
              tabPress: e => {
                if (data.name === '등록') {
                  e.preventDefault();
                  navigation.navigate('RoomCRUD', {id: 0});
                }
              },
            })}
            name={data.name}
            component={data.component}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomImg: {
    width: 25,
    height: 22,
  },
});

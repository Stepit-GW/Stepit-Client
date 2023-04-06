import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {bottomRoutesData} from '@/static/bottomRoutesData';
import Home from '@/pages/Home';
import ShortVideo from '@/pages/ShortVideo';
import Mypage from '@/pages/Mypage';

const Tab = createBottomTabNavigator();

export default function BottomNavigation(): JSX.Element {
  const [iconColor, setIconColor] = useState(false);
  useEffect(() => {}, [iconColor]);
  return (
    <Tab.Navigator initialRouteName="Home">
      {bottomRoutesData.map((data: any, idx: number) => {
        return (
          <Tab.Screen
            key={idx}
            options={{
              headerShown: false,
              tabBarStyle: {
                paddingTop: 10,
                backgroundColor: data.name === '탐색' ? 'black' : 'white',
                // height: 65,
              },
              tabBarLabel: ({focused}) => (
                <Text style={{display: 'none'}}>{data.name}</Text>
              ),
              tabBarIcon: ({focused}: any) => {
                return (
                  <Image
                    source={iconColor ? data.act : data.none}
                    style={styles.bottomImg}
                  />
                );
              },
            }}
            listeners={() => ({
              tabPress: e => {
                if (data.name === '탐색') setIconColor(true);
                else setIconColor(false);
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
    width: 48,
    height: 48,
  },
});

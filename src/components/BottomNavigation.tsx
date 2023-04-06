import React, {useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {bottomRoutesData} from '@/static/bottomRoutesData';

const Tab = createBottomTabNavigator();

export default function BottomNavigation(): JSX.Element {
  let [iconColor, setIconColor] = useState(true);

  return (
    <Tab.Navigator initialRouteName="Home">
      {bottomRoutesData.map((data: any, idx: number) => {
        return (
          <Tab.Screen
            key={idx}
            options={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: data.name === '탐색' ? 'black' : 'white',
                // height: 65,
              },
              tabBarLabel: ({focused}) => (
                <Text style={{display: 'none'}}>{data.name}</Text>
              ),
              tabBarIcon: ({focused}: any) => {
                if (data.name === '탐색' && focused) {
                  iconColor = false;
                  setIconColor(false);
                } else {
                  iconColor = true;
                  setIconColor(true);
                }
                return (
                  <Image
                    source={iconColor ? data.none : data.act}
                    style={styles.bottomImg}
                  />
                );
              },
            }}
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

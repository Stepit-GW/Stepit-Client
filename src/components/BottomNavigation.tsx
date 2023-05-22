import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {bottomRoutesData} from '@/static/bottomRoutesData';
import {useSetRecoilState} from 'recoil';
import {videoShortState} from '@/recoil/videoShortState';

const Tab = createBottomTabNavigator();

export default function BottomNavigation(): JSX.Element {
  const [iconColor, setIconColor] = useState(false);
  const setVideoShortTf = useSetRecoilState(videoShortState);

  useEffect(() => {}, [iconColor]);
  return (
    <Tab.Navigator initialRouteName="Home">
      {bottomRoutesData.map((data: any, idx: number) => {
        return (
          <Tab.Screen
            key={idx}
            options={{
              unmountOnBlur: true,
              headerShown: false,
              tabBarStyle: {
                paddingBottom: 5,
                backgroundColor: data.name === '탐색' ? 'black' : 'white',
                height: 62,
              },
              tabBarLabel: ({focused}) => (
                <Text style={{display: 'none'}}>{data.name}</Text>
              ),
              tabBarIcon: ({focused}: any) => {
                return (
                  <Image
                    source={
                      focused
                        ? iconColor
                          ? data.whiteAct
                          : data.act
                        : iconColor
                        ? data.whiteNone
                        : data.none
                    }
                    style={styles.bottomImg}
                  />
                );
              },
            }}
            listeners={() => ({
              tabPress: e => {
                if (data.name === '탐색') setIconColor(true);
                else {
                  setIconColor(false);
                  setVideoShortTf([true, true, true, true, true, true]);
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
    width: 48,
    height: 48,
  },
});

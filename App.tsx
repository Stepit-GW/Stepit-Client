/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useWindowDimensions} from 'react-native';

import BottomNavigation from './src/components/BottomNavigation';
import {signRoutesData} from '@/static/signRoutesData';
import {mypageRoutesData} from '@/static/mypageRoutesData';
import VideoInfo from '@/pages/VideoInfo';
import {useRecoilState} from 'recoil';
import {windowState} from '@/recoil/windowState';
import CameraScreen from '@/components/camera/CameraScreen';
import VideoTutorial from '@/pages/VideoTutorial';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const [window, setWindow] = useRecoilState(windowState);
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    setWindow({
      ...window,
      width,
      height,
      ipad: width > 767,
      orientation: width < (height / 2) * 3,
    });
  }, [width, height]);

  return (
    // <SafeAreaView style={commonStyles.container}>

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
          name="VideoTutorial"
          component={VideoTutorial}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
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
    // </SafeAreaView>
  );
}

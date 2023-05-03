import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, Pressable, Text, View, Image} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import BtnVideoTitle from '@/components/video/BtnVideoTitle';
import {useNavigation} from '@react-navigation/native';

export default function CameraScreen(): JSX.Element {
  const navigate = useNavigation<any>();
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  if (device == null)
    return (
      <>
        <Pressable
          style={{position: 'absolute', top: 100}}
          onPress={() => {
            navigate.pop();
          }}>
          <Image source={require('@/assets/arrow-black-24.png')} />
        </Pressable>
        <Text style={{position: 'absolute', top: 200, fontSize: 40}}>
          device fail
        </Text>
      </>
    );
  return (
    <>
      <Camera
        style={{width: '100%', height: '100%'}}
        device={device}
        isActive={true}
      />

      <Pressable
        style={{position: 'absolute', top: 100}}
        onPress={() => {
          navigate.pop();
        }}>
        <Image source={require('@/assets/arrow-black-24.png')} />
      </Pressable>
    </>
  );
}

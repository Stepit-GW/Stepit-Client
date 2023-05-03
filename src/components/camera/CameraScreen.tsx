import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, Pressable, Text, View, Image} from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {RNCamera} from 'react-native-camera';
// import {request, PERMISSIONS} from 'react-native-permissions';

import BtnVideoTitle from '@/components/video/BtnVideoTitle';
import {useNavigation} from '@react-navigation/native';

export default function CameraScreen(): JSX.Element {
  const navigate = useNavigation<any>();

  const [isRecording, setIsRecording] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  async function handleRecordButton() {
    console.log('start');
    if (!cameraRef) {
      return;
    }
    console.log('start2');

    if (isRecording) {
      cameraRef.stopRecording();
      setIsRecording(false);
    } else {
      const options = {
        quality: RNCamera.Constants.VideoQuality['1080p'],
        maxDuration: 10,
      };
      const data = await cameraRef.recordAsync(options);
      console.log('Video recorded at', data.uri);
      setIsRecording(true);
    }
  }

  return (
    <View style={{flex: 1}}>
      <RNCamera
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        ref={(ref: any) => {
          setCameraRef(ref);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{width: '100%', position: 'absolute', top: 100}}
            onPress={() => {
              navigate.pop();
            }}>
            <Image source={require('@/assets/arrow-black-24.png')} />
          </Pressable>
          <Pressable
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => handleRecordButton()}>
            <Text
              style={{
                color: 'white',
                fontSize: 40,
                position: 'absolute',
                bottom: 100,
              }}>
              {isRecording ? 'stop' : 'start'}
            </Text>
            {/* <FontAwesome
              name={isRecording ? 'stop' : 'circle'}
              size={50}
              color={isRecording ? 'red' : 'white'}
            /> */}
          </Pressable>
        </View>
      </RNCamera>
    </View>
  );
}

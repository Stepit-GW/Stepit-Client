import React, {useEffect, useRef, useState} from 'react';
import {Button, Pressable, Text, View} from 'react-native';
import VideoRecorder from 'react-native-beautiful-video-recorder';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';

export default function CameraScreen(): JSX.Element {
  const cameraRef = useRef(null);
  const videoRecord = async () => {
    if (cameraRef && cameraRef.current) {
      cameraRef.current.open({maxLength: 5}, (data: any) => {
        console.log('captured data', data); // data.uri is the file path
      });
    }
  };
  return (
    <>
      <View>
        <VideoRecorder ref={cameraRef} />
        <Pressable onPress={() => videoRecord()} style={{marginTop: 100}}>
          <Text>Open Recorder</Text>
        </Pressable>
      </View>
    </>
  );
}

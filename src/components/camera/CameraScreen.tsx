import React, {useEffect, useRef} from 'react';
import {Text} from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';

export default function CameraScreen(): JSX.Element {
  // useEffect(() => {
  //   const getDevices = async () => {
  //     const devices = await Camera.getAvailableCameraDevices();
  //   };

  //   getDevices();
  // }, []);

  // const devices = useCameraDevices();
  // const device = devices.back;

  // if (device == null) return <></>;
  return (
    <>
      <Text>Camera</Text>
      {/* <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} /> */}
    </>
  );
}

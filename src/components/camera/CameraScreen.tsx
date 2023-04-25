import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text} from 'react-native';
import Styled from 'styled-components/native';
import Voice from 'react-native-voice';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;
const ButtonRecord = Styled.Button``;
const VoiceText = Styled.Text`
  margin: 32px;
`;

export default function CameraScreen(): JSX.Element {
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const buttonLabel = isRecord ? '진행중' : '시작';
  const voiceLabel = text
    ? text
    : isRecord
    ? 'Say something...'
    : 'press Start button';

  const _onSpeechStart = () => {
    console.log('onSpeechStart');
    setText('');
  };
  const _onSpeechEnd = () => {
    console.log('onSpeechEnd');
  };
  const _onSpeechResults = (event: any) => {
    console.log('onSpeechResults');
    setText(event.value[0]);
  };
  const _onSpeechError = (event: any) => {
    console.log('_onSpeechError');
    console.log(event.error);
  };

  const _onRecordVoice = () => {
    Voice.start('ko-KR'); // en-US
    setIsRecord(true);
  };

  useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  return (
    <>
      <Text>Voice</Text>
      <VoiceText>{voiceLabel}</VoiceText>
      <ButtonRecord onPress={_onRecordVoice} title={buttonLabel} />
      {/* <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} /> */}
    </>
  );
}

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {useRecoilState} from 'recoil';
import {modalVideoState} from '@/recoil/modalVideoState';
import Title from '@/components/Title';
import {MARGIN_HOR, MARGIN_VER, TOP_HEIGHT} from '@/static/commonValue';

export default function ModalVideo({}: any): JSX.Element {
  const [modalVideo, setModalVideo] = useRecoilState(modalVideoState);

  return (
    <Modal visible={modalVideo} animationType="slide">
      <SafeAreaView style={[commonStyles.container, styles.container]}>
        {/* <View style={commonStyles.containerView}> */}

        <View style={styles.top}>
          <Pressable
            onPress={() => {
              setModalVideo(false);
            }}>
            <Image
              source={require('@/assets/video/x-white-24.png')}
              style={commonStyles.img}
            />
          </Pressable>
          <Text style={styles.title}>르세라핌</Text>
        </View>

        <Image
          source={require('@/assets/notfound.png')}
          style={commonStyles.videoImg}
        />

        <View style={styles.bottom}>
          <View style={styles.line} />
          <View style={styles.middleBox}></View>
        </View>
        {/* </View> */}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },

  top: {
    height: TOP_HEIGHT,
    marginTop: MARGIN_VER,
    paddingHorizontal: MARGIN_HOR,

    position: 'absolute',
    top: 0,

    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 18,
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
  },

  bottom: {
    width: '100%',
    paddingHorizontal: MARGIN_HOR,

    position: 'absolute',
    bottom: 0,
  },
  line: {
    width: '100%',
    marginBottom: 36,

    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'white',
  },
  middleBox: {},
});

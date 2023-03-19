import {
  BTN_HEIGHT,
  MARGIN_BOTTOM,
  MARGIN_HOR,
  MARGIN_VER,
  PINK1,
  TOP_HEIGHT,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import React, {useState} from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
} from 'react-native';
import Btn from '../Btn';

export default function ModalRoomDetail({setVisible}: any): JSX.Element {
  const [visibleIn, setVisibleIn] = useState(true);
  return (
    <>
      <View style={styles.bg} />
      {visibleIn ? (
        <View style={styles.modal}>
          <Image
            source={require('@/assets/notfound.png')}
            style={styles.modalImg}
          />
          <Pressable
            style={styles.xImg}
            onPress={() => {
              setVisible(false);
            }}>
            <Image source={require('@/assets/notfound.png')} />
          </Pressable>
          <Text>Hi</Text>
          <Btn
            text={'참여'}
            Fn={() => {
              setVisibleIn(false);
              setTimeout(() => {
                setVisible(false);
                setVisibleIn(true);
              }, 2000);
            }}
            style={{
              width: 48,
              height: 25,
            }}
          />
        </View>
      ) : (
        <View style={styles.modalParty}>
          <Text>방장님에게 참여 요청이 전송되었습니다.</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',

    position: 'absolute',
    opacity: 0.3,
    backgroundColor: '#000',
    zIndex: 900,
  },

  modal: {
    width: '80%',
    height: 545,

    alignSelf: 'center',
    overflow: 'hidden',

    position: 'absolute',
    top: MARGIN_VER + BTN_HEIGHT + 10,

    backgroundColor: 'white',
    borderRadius: 15,
    zIndex: 901,
  },

  modalImg: {
    width: '100%',
    height: 230,
  },
  xImg: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  modalParty: {
    width: '80%',
    height: 58,

    position: 'absolute',
    top: WINDOW_HEIGHT / 2.2,
    // left: 0,
    // right: 0,
    // bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 15,
    zIndex: 901,
  },
});

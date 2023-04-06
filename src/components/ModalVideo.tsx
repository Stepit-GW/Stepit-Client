import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {useRecoilState} from 'recoil';
import {modalVideoState} from '@/recoil/modalVideoState';
import {MARGIN_HOR, MARGIN_VER, TOP_HEIGHT} from '@/static/commonValue';

export default function ModalVideo({}: any): JSX.Element {
  const [modalVideo, setModalVideo] = useRecoilState(modalVideoState);
  const {width, height} = useWindowDimensions();
  const [orientation, setOrientation] = useState(true);

  useEffect(() => {
    if (width > height) setOrientation(false);
    else setOrientation(true);
  }, [width, height]);

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
          style={[
            {
              width: orientation ? width : (height / 2) * 3,
              height: orientation ? (width / 3) * 2 : height,
              alignSelf: 'center',
            },
          ]}
        />

        <View style={[styles.middleBox, orientation && {bottom: 25 + 25 + 10}]}>
          <Image
            source={require('@/assets/video/back-24.png')}
            style={styles.middleImg}
          />
          <Image
            source={require('@/assets/video/start-24.png')}
            style={[styles.middleImg, {marginHorizontal: 45}]}
          />
          <Image
            source={require('@/assets/video/front-24.png')}
            style={styles.middleImg}
          />
        </View>

        <View style={styles.bottom}>
          <View style={styles.topBox}>
            <Text style={styles.topText}>0:00/15:20</Text>
            <Image
              source={require('@/assets/screen-scaleup-24.png')}
              style={[commonStyles.img, {}]}
            />
          </View>

          <View style={Styles(orientation).lineBox}>
            <View style={Styles(orientation).circle} />
            <View style={[Styles(orientation).line, {opacity: 0.3}]} />
            <Image
              source={require('@/assets/screen-scaleup-24.png')}
              style={[commonStyles.img, {display: 'none'}]}
            />

            <View style={styles.realLine}>
              <View style={{width: '50%'}}>
                <View style={[{borderWidth: 1, borderColor: 'white'}]} />
              </View>
            </View>
            <View style={styles.realLine}>
              <View style={{width: '100%'}}>
                <Image
                  source={require('@/assets/video/check-22.png')}
                  style={[Styles(orientation).checks, {marginLeft: '50%'}]}
                />
              </View>
            </View>
          </View>

          <View style={styles.bottomBox}>
            <View style={styles.bottomBtn}>
              <Image
                source={require('@/assets/video/mirror-mode-24.png')}
                style={commonStyles.img}
              />
              <Text style={styles.bottomText}>거울모드</Text>
            </View>
            <View style={styles.bottomBtn}>
              <Image
                source={require('@/assets/video/double-speed-24.png')}
                style={commonStyles.img}
              />
              <Text style={styles.bottomText}>배속(1.0x)</Text>
            </View>
          </View>
        </View>
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
    zIndex: 900,
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
  topBox: {
    height: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topText: {
    color: 'white',
  },

  realLine: {
    width: '100%',
    paddingRight: 0,
    position: 'absolute',
    alignSelf: 'center',
  },

  middleBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',

    position: 'absolute',
    // 가로가 되면 얘 바꿔야함
  },
  middleImg: {
    width: 36,
    height: 36,
  },

  bottomBox: {
    width: '100%',
    height: 25,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBtn: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    height: 25,
    marginLeft: 5,

    color: 'white',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 25,
  },
});

const Styles = (ori: boolean) =>
  StyleSheet.create({
    lineBox: {
      width: '100%',
      height: 24,
      marginBottom: ori ? 36 + 36 + 25 : 10,
      flexDirection: 'row',
    },
    circle: {
      width: ori ? 10 : 14,
      height: ori ? 10 : 14,
      alignSelf: 'center',
      borderRadius: ori ? 10 : 14,
      backgroundColor: 'white',
    },
    line: {
      flex: 1,
      height: 1,

      alignSelf: 'center',
      borderWidth: 1,
      borderColor: 'white',
    },
    checks: {
      width: ori ? 10 : 22,
      height: ori ? 10 : 22,
    },
  });

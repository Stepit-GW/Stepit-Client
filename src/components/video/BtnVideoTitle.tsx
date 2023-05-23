import {videoShortState} from '@/recoil/videoShortState';
import {windowState} from '@/recoil/windowState';
import {
  MARGIN_HOR,
  MARGIN_VER,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/static/commonValue';
import {commonStyles} from '@/styles/commonStyles';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';

const BtnVideoTitle = React.forwardRef(
  (
    {
      children,
      title,
      aniOpacity,
      aniOpacityT,
      _Speech,
      videoStageTf,
      setVideoStageTf,
      shortId,
      videoStopTimeTf,
      setVideoStopTimeTf,
    }: any,
    ref,
  ): any => {
    const navigation = useNavigation<any>();
    const [window, setWindow] = useRecoilState(windowState);
    const [, setVideoShortTf] = useRecoilState(videoShortState);

    const translateX = {
      translateX: -(WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
    };
    const translateY = {
      translateX: (WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
    };

    return (
      <SafeAreaView
        style={[
          commonStyles.container,
          styles.containerTitle,
          {
            width: window.width,
            height: window.force ? window.height : 0,
            zIndex: window.force ? 902 : 999,
            transform: [
              translateX,
              {rotate: window.force ? '90deg' : '0deg'},
              translateY,
            ],
          },
        ]}>
        <View
          style={{
            width: '100%',
            height: window.ipad ? 54 : 36,
            paddingHorizontal: window.force ? MARGIN_HOR * 3 : MARGIN_HOR,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <View style={commonStyles.row}>
            {!window.force && (
              <Pressable
                onPress={() => {
                  if (shortId !== undefined)
                    if (shortId === 0)
                      setVideoShortTf([false, true, true, true, true, true]);
                    else if (shortId === 1)
                      setVideoShortTf([true, false, true, true, true, true]);
                    else if (shortId === 2)
                      setVideoShortTf([true, true, false, true, true, true]);
                    else if (shortId === 3)
                      setVideoShortTf([true, true, true, false, true, true]);
                    else if (shortId === 4)
                      setVideoShortTf([true, true, true, true, false, true]);
                    else if (shortId === 5)
                      setVideoShortTf([true, true, true, true, true, false]);

                  _Speech();
                  navigation.pop();
                  let lst = videoStageTf;
                  for (let i = 0; i < videoStageTf.length; i++)
                    lst[i].tf = false;
                  setVideoStageTf(lst);
                  if (videoStopTimeTf !== undefined) {
                    let lst = videoStopTimeTf;
                    for (let i = 0; i < videoStopTimeTf.length; i++)
                      lst[i].tf = false;
                    setVideoStopTimeTf(lst);
                  }
                  setWindow({
                    ...window,
                    width: WINDOW_WIDTH,
                    height: WINDOW_WIDTH,
                    force: false,
                  });
                }}>
                <Image
                  source={require('@/assets/arrow-white-24.png')}
                  style={Styles(window.ipad).img}
                />
              </Pressable>
            )}
            <Animated.Text
              style={{
                alignSelf: 'center',
                color: 'white',
                opacity: aniOpacityT,

                fontSize: 16,
                // fontSize: window.ipad ? 24 : 16,
                fontWeight: '600',
              }}>
              {title}
            </Animated.Text>
          </View>
          {/* <Animated.View style={[commonStyles.row, {opacity: aniOpacity}]}>
            {children}
          </Animated.View> */}
          <Animated.View style={[commonStyles.row, {opacity: aniOpacityT}]}>
            {children}
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  containerTitle: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

const Styles = (ipad: boolean) =>
  StyleSheet.create({
    img: {
      width: ipad ? 40 : 24,
      height: ipad ? 40 : 24,
      marginRight: ipad ? 10 : 5,
    },
  });

export default BtnVideoTitle;

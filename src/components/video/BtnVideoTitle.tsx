import {windowState} from '@/recoil/windowState';
import {MARGIN_HOR, WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';
import {videoDetailDatas} from '@/static/videoDetail/videoDetailDatas';
import {commonStyles} from '@/styles/commonStyles';
import {useNavigation} from '@react-navigation/native';
import React, {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
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
  ({children, aniOpacityT, _Speech}: any, ref): any => {
    const navigation = useNavigation<any>();
    const [window, setWindow] = useRecoilState(windowState);

    const translateX = {
      translateX: -(WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
    };
    const translateY = {
      translateX: (WINDOW_HEIGHT - WINDOW_WIDTH) / 2,
    };

    const [detailDatas, setDetailData] = useState<any>([]);
    useEffect(() => {
      setDetailData(videoDetailDatas);
    }, []);

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
                  _Speech();
                  navigation.pop();
                  let lst = detailDatas;
                  for (let i = 0; i < detailDatas.length; i++)
                    lst[i].tf = false;
                  setDetailData(lst);
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
              르세르팜
            </Animated.Text>
          </View>
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

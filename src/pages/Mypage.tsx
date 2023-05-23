import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import {MARGIN_VER, TOP_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';
import Title from '@/components/Title';
import {commonStyles} from '@/styles/commonStyles';
import {useRecoilState} from 'recoil';
import {galleryState} from '@/recoil/galleryState';
import {windowState} from '@/recoil/windowState';
import {videoDetailFilter, videoIdFilter} from '@/utils/videoFilter';

export default function Mypage({navigation}: any): JSX.Element {
  const [window, setWindow] = useRecoilState(windowState);
  const [gallery, setGallery] = useRecoilState(galleryState);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView, commonStyles.paddingHor]}>
        <View style={styles.title}>
          <View />
          <Text style={styles.titleText}>내 앨범</Text>
          <View />
        </View>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {gallery.map((data: any, idx: number) => {
            const video = videoIdFilter({id: data.id});

            return (
              <Pressable
                key={idx}
                style={[
                  Styles(window.ipad).videoBox,
                  {
                    marginBottom: 25,
                    marginRight:
                      idx === gallery.length - 1
                        ? window.ipad
                          ? idx % 4 === 3
                            ? 0
                            : (WINDOW_WIDTH - 4 * 180 - 40) / 3
                          : MARGIN_VER * 2 - 10
                        : window.ipad
                        ? idx % 4 === 3
                          ? 0
                          : (WINDOW_WIDTH - 4 * 180 - 40) / 3
                        : 10,
                  },
                ]}
                onPress={() => {
                  navigation.navigate('GalleryDetail', {galleryIdx: idx});
                }}>
                <View style={styles.videoBottom}>
                  <Text style={Styles(window.ipad).videoLeft}>
                    {video.title}
                    {/* {video.title === 'Because Of You'
                      ? 'Because...'
                      : video.title} */}
                  </Text>

                  {/* {video.level !== undefined && (
                    <View style={Styles(window.ipad).videoRightBox}>
                      <Text style={Styles(window.ipad).videoRight}>
                        {video.level}
                      </Text>
                    </View>
                  )} */}
                </View>

                <Image
                  source={{uri: video.imgUrl}}
                  style={[commonStyles.img100, {opacity: 0.8}]}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    height: TOP_HEIGHT,
    marginBottom: MARGIN_VER,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
  },

  videoBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'absolute',
    left: 3,
    bottom: 9,
    zIndex: 900,
  },
});

const Styles = (ipad: boolean) =>
  StyleSheet.create({
    titleBox: {
      width: '100%',
      height: (ipad ? 54 : 36) + MARGIN_VER * 2,
      paddingTop: MARGIN_VER * 2,

      position: 'absolute',
      top: 0,

      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent',
      zIndex: 1,
    },
    title: {
      width: ipad ? 120 : 80,
      height: ipad ? 32 : 20,
    },

    scrollTitle: {
      marginLeft: MARGIN_VER,
      marginBottom: 20,

      color: 'black',
      fontSize: ipad ? 22 : 16,
      fontWeight: '700',
    },
    videoTitle: {
      width: '100%',
      marginTop: 7,
      paddingHorizontal: 10,

      position: 'absolute',
      top: 0,

      color: 'white',
      fontWeight: '800',
      fontSize: ipad ? 20 : 14,

      zIndex: 900,
    },
    videoRightBox: {
      width: ipad ? 24 : 20,
      height: ipad ? 24 : 20,
      marginRight: 14,

      justifyContent: 'center',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 20,
    },
    videoRight: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '500',
      fontSize: ipad ? 14 : 12,
    },
    videoLeft: {
      marginLeft: 10,
      color: 'white',
      fontWeight: '800',
      fontSize: ipad ? 16 : 14,
    },

    videoBox: {
      width: ipad ? 180 : 150,
      height: ipad ? 240 : 200,

      overflow: 'hidden',
      borderRadius: 15,
      backgroundColor: 'black',
    },
  });

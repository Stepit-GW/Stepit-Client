import {MARGIN_HOR, MARGIN_VER, WINDOW_WIDTH} from '@/static/commonValue';
import {Dimensions, StyleSheet} from 'react-native';

export const basicDimensions = {
  // 디자이너가 작업하고 있는 XD파일 스크린의 세로,가로
  height: 740,
  width: 360,
};

export const commonStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  containerView: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    marginVertical: MARGIN_VER,
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },

  img: {
    width: 24,
    height: 24,
  },
  screenImg: {
    width: WINDOW_WIDTH,
    height: (WINDOW_WIDTH / 10) * 11,
  },
  videoImg: {
    width: WINDOW_WIDTH,
    height: (WINDOW_WIDTH / 3) * 2,
  },
  img100: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  marginHor: {
    marginHorizontal: MARGIN_HOR,
  },
  marginTop: {
    marginTop: 10,
  },

  paddingHor: {
    paddingHorizontal: MARGIN_HOR,
  },
});

export const CommonStyles = (ipad: boolean) =>
  StyleSheet.create({
    img3_4: {
      width: ipad ? 180 : 150,
      height: ipad ? 240 : 200,
    },
  });

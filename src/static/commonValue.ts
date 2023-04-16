import {Dimensions} from 'react-native';

export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;

export const videoHeight1 = (WINDOW_WIDTH / 10) * 11;
export const videoHeight2 = (WINDOW_WIDTH / 3) * 2;

export const MARGIN_VER = 24;
export const TOP_HEIGHT = 40;
export const MARGIN_HOR = 20;
export const BTN_HEIGHT = 48;

export const MARGIN_BOTTOM = 16;

// color
export const PINK0 = '#C65B7D';
export const PINK1 = '#F69BB8';
export const PINK2 = '#F49898';
export const PINK3 = '#F7CBD9';
export const PINK4 = '#FAF6F6';
export const GRAY = '#E7E7E7';

export const basicDimensions = {
  // 디자이너가 작업하고 있는 XD파일 스크린의 세로,가로
  height: 740,
  width: 360,
};

export const height = // 높이 변환 작업
  (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2);

export const width = // 가로 변환 작업
  (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2);

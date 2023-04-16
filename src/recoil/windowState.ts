import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/static/commonValue';
import {Dimensions} from 'react-native';
import {atom} from 'recoil';

export const windowState = atom({
  key: 'windowState',
  default: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    ipad: false,
    force: false,
    orientation: false,
  },
});

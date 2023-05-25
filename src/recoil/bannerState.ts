import {atom} from 'recoil';

export const bannerState = atom({
  key: 'bannerState',
  default: [true, true, true, true],
});

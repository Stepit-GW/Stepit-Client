import {atom} from 'recoil';

export const videoShortState = atom({
  key: 'videoShortState',
  default: [true, true, true, true, true, true],
});

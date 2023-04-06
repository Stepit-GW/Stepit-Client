/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {RecoilRoot} from 'recoil';
import App from './App';

export default function Root(): JSX.Element {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

import Switch from '@/components/Switch';
import Title from '@/components/Title';
import {commonStyles} from '@/styels/commonStyles';
import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

// import {commonStyles, fontStyle, modalStyle} from '@/styles/commonStyles';

import {useSetRecoilState} from 'recoil';

export default function Notice({navigation}: any) {
  const [isEnabled, setIsEnabled] = useState<boolean[]>([false, false]);

  const noticeArr = [
    {
      title: '어쩌구 저쩌구',
      id: 0,
      checked: false,
    },
    {
      title: '어쩌구 저쩌구',
      id: 1,
      checked: false,
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.container, commonStyles.paddingHor]}>
        <Title text={'알림 설정'} />
        {noticeArr.map((notice, idx) => (
          <View key={idx} style={styles.notice}>
            <Text>{notice.title}</Text>

            <Switch
              {...{
                idx: idx,
                isEnabled: isEnabled,
                setIsEnabled: setIsEnabled,
              }}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notice: {
    height: 30,
    marginVertical: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Slider from '@/components/Slider';
import RNPickerSelect from 'react-native-picker-select';

import Btn from '@/components/Btn';
import {GRAY, PINK1, PINK4} from '@/static/commonValue';
import {commonStyles} from '@/styels/commonStyles';
import Title from '@/components/Title';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function RoomCRUD({route}: any): JSX.Element {
  const id = route.params.id;
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView, commonStyles.marginHor]}>
        <Title
          text={id === 0 ? '새 채팅방' : '방정보 수정'}
          textStyle={{fontSize: 20}}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imgBox}>
            <Image
              source={require('@/assets/insert-img.png')}
              style={styles.img}
            />
            <Image
              source={require('@/assets/insert-imgRight.png')}
              style={styles.imgRight}
            />
          </View>

          <Text style={styles.input}>선물 받을 사람</Text>
          <View style={styles.textInputBox}>
            <Image
              source={require('@/assets/insert-name.png')}
              style={styles.inputImg}
            />
            <TextInput style={styles.textInput} placeholder="이름" />
          </View>
          <View style={styles.textInputBox}>
            <Image
              source={require('@/assets/insert-insta.png')}
              style={styles.inputImg}
            />
            <TextInput style={styles.textInput} placeholder="instagram ID" />
          </View>

          <Text style={styles.input}>선물</Text>
          <View style={styles.textInputBox}>
            <Image
              source={require('@/assets/insert-gift.png')}
              style={styles.inputImg}
            />
            <TextInput style={styles.textInput} placeholder="선물명" />
          </View>
          <View style={styles.textInputBox}>
            <Image
              source={require('@/assets/insert-link.png')}
              style={styles.inputImg}
            />
            <TextInput style={styles.textInput} placeholder="선물 구매 링크" />
          </View>

          <Text style={styles.input}>이벤트 날짜</Text>

          <RNPickerSelect
            onValueChange={(value: any) => {
              console.log(value);
            }}
            items={[
              {label: '전체', value: '전체'},
              {label: '진행중', value: '진행중'},
              {label: '마감', value: '마감'},
            ]}
          />
          <RNPickerSelect
            onValueChange={(value: any) => {
              console.log(value);
            }}
            items={[
              {label: '전체', value: '전체'},
              {label: '진행중', value: '진행중'},
              {label: '마감', value: '마감'},
            ]}
          />
          <RNPickerSelect
            onValueChange={(value: any) => {
              console.log(value);
            }}
            items={[
              {label: '전체', value: '전체'},
              {label: '진행중', value: '진행중'},
              {label: '마감', value: '마감'},
            ]}
          />

          <Text style={styles.input}>인원</Text>
          <Slider />
          {/* <MultiSlider
            isMarkersSeparated={true}
            customMarkerLeft={e => {
              return (
                <View style={{width: 20, height: 20, backgroundColor: 'red'}} />
              );
            }}
            customMarkerRight={e => {
              return (
                <View style={{width: 20, height: 20, backgroundColor: 'red'}} />
              );
            }}
          /> */}

          <Text style={styles.input}>이벤트 내용</Text>
          <View style={styles.textInputEventBox}>
            <Text style={styles.num}>0/100</Text>
            <TextInput
              style={styles.textInput}
              placeholder="이벤트 내용을 입력해주세요."
            />
          </View>

          <Btn Fn={() => {}} text="완료" style={{}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imgBox: {
    width: 134,
    height: 134,
    marginTop: 40,
    marginBottom: 28,

    overflow: 'hidden',
    alignSelf: 'center',

    borderWidth: 1,
    borderColor: PINK1,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  imgRight: {
    width: 25,
    height: 25,
    position: 'absolute',

    right: 12,
    bottom: 12,
    zIndex: 1,
  },

  input: {
    marginTop: 12,
    marginBottom: 17,
    fontSize: 15,
    fontWeight: '500',
  },
  textInputBox: {
    width: '100%',
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 16,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 10,
  },
  textInput: {
    width: '100%',
    height: '100%',
    marginLeft: 21,
  },
  inputImg: {
    width: 15,
    height: 15,
  },

  num: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#9B9DA6',
  },
  textInputEventBox: {
    height: 118,
    marginBottom: 36,
    borderRadius: 10,
    backgroundColor: PINK4,
  },
});

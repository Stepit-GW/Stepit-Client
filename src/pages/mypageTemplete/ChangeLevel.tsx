import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {commonStyles} from '@/styles/commonStyles';
import {MARGIN_VER} from '@/static/commonValue';
import Title from '@/components/Title';
import {useNavigation} from '@react-navigation/native';

export default function ChangeLevel(): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.containerView}>
        <Title
          style={{marginTop: MARGIN_VER}}
          leftComponent={
            <Pressable
              onPress={() => {
                navigation.pop();
              }}>
              <Image
                source={require('@/assets/arrow-black-24.png')}
                style={commonStyles.img}
              />
            </Pressable>
          }
          rightComponent={<></>}
        />
        <Text>ChangeLevel</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

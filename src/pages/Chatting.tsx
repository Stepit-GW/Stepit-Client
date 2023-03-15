import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {commonStyles} from '@/styels/commonStyles';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function Chatting(): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={[commonStyles.containerView]}>
        <Pressable
          onPress={() => {
            navigation.pop();
          }}>
          <Text>a</Text>
        </Pressable>
        <Text>Chatting</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatRoom: {},
  scroll: {
    flex: 1,
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },

  chatBox: {
    marginBottom: 42,
    flexDirection: 'row',
    position: 'relative',
  },
  chatBoxIn: {
    width: '100%',
  },

  timeNum: {
    position: 'absolute',
    right: 0,
  },
});

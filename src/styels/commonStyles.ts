import {MARGIN_HOR} from '@/static/commonValue';
import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerView: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },

  img: {
    width: 40,
    height: 40,
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

import {MARGIN_HOR, MARGIN_VER, WINDOW_WIDTH} from '@/static/commonValue';
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
    marginVertical: MARGIN_VER,
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },

  img: {
    width: 24,
    height: 24,
  },
  screenImg: {
    width: WINDOW_WIDTH,
    height: (WINDOW_WIDTH / 10) * 11,
  },
  videoImg: {
    width: WINDOW_WIDTH,
    height: (WINDOW_WIDTH / 3) * 2,
  },
  img100: {
    width: '100%',
    height: '100%',
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

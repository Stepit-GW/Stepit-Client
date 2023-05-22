import Home from '@/pages/Home';
import Mypage from '@/pages/Mypage';
import VideoShort from '@/pages/VideoShort';

export const bottomRoutesData = [
  {
    name: '홈',
    component: Home,
    act: require('@/assets/bottomRoutes/home-fill-48.png'),
    none: require('@/assets/bottomRoutes/home-48.png'),
    whiteAct: require('@/assets/bottomRoutes/home-white-48.png'),
    whiteNone: require('@/assets/bottomRoutes/home-white-48.png'),
  },
  {
    name: '탐색',
    component: VideoShort,
    act: require('@/assets/bottomRoutes/short-48.png'),
    none: require('@/assets/bottomRoutes/short-48.png'),
    whiteAct: require('@/assets/bottomRoutes/short-white-fill-48.png'),
    whiteNone: require('@/assets/bottomRoutes/short-white-fill-48.png'),
  },
  {
    name: '마이페이지',
    component: Mypage,
    act: require('@/assets/bottomRoutes/mypage-fill-48.png'),
    none: require('@/assets/bottomRoutes/mypage-48.png'),
    whiteAct: require('@/assets/bottomRoutes/mypage-white-48.png'),
    whiteNone: require('@/assets/bottomRoutes/mypage-white-48.png'),
  },
];

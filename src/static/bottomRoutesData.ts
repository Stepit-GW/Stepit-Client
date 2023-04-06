import Home from '@/pages/Home';
import Mypage from '@/pages/Mypage';
import ShortVideo from '@/pages/ShortVideo';

export const bottomRoutesData = [
  {
    name: '홈',
    component: Home,
    act: require('@/assets/bottomRoutes/home-white-48.png'),
    none: require('@/assets/bottomRoutes/home-48.png'),
  },
  {
    name: '탐색',
    component: ShortVideo,
    act: require('@/assets/bottomRoutes/short-video-white-48.png'),
    none: require('@/assets/bottomRoutes/short-video-48.png'),
  },
  {
    name: '마이페이지',
    component: Mypage,
    act: require('@/assets/bottomRoutes/mypage-white-48.png'),
    none: require('@/assets/bottomRoutes/mypage-48.png'),
  },
];

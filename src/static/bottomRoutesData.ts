import Home from '@/pages/Home';
import Mypage from '@/pages/Mypage';
import Search from '@/pages/Search';

export const bottomRoutesData = [
  {
    name: '홈',
    component: Home,
    act: require('@/assets/bottomRoutes/home-24.png'),
    none: require('@/assets/bottomRoutes/home-24.png'),
  },
  {
    name: '탐색',
    component: Search,
    act: require('@/assets/bottomRoutes/search-24.png'),
    none: require('@/assets/bottomRoutes/search-24.png'),
  },
  {
    name: '마이페이지',
    component: Mypage,
    act: require('@/assets/bottomRoutes/mypage-24.png'),
    none: require('@/assets/bottomRoutes/mypage-24.png'),
  },
];

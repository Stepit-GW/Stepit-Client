import ChangeLevel from '@/pages/mypageTemplete/ChangeLevel';
import Downloads from '@/pages/mypageTemplete/Downloads';
import Hearts from '@/pages/mypageTemplete/Hearts';
import Settings from '@/pages/mypageTemplete/Settings';

export const mypageRoutesData = [
  {
    name: 'Hearts',
    component: Hearts,
    img: require('@/assets/mypage/heart-24.png'),
    title: '찜한 목록',
    navi: 'Hearts',
  },
  {
    name: 'Downloads',
    component: Downloads,
    img: require('@/assets/mypage/download-24.png'),
    title: '다운로드한 목록',
    navi: 'Downloads',
  },
  {
    name: 'ChangeLevel',
    component: ChangeLevel,
    img: require('@/assets/mypage/logout-24.png'),
    title: '난이도 변경',
    navi: 'ChangeLevel',
  },
  {
    name: 'Settings',
    component: Settings,
    img: require('@/assets/mypage/setting-24.png'),
    title: '설정',
    navi: 'Settings',
  },
];

import Home from '@/pages/Home';
import Chat from '@/pages/Chat';
import Insert from '@/pages/Insert';
import Alarm from '@/pages/Alarm';
import Mypage from '@/pages/Mypage';

export const bottomRoutesData = [
  {
    name: '홈',
    component: Home,
    act: require('@/assets/bottomRoutes/home-fill.png'),
    none: require('@/assets/bottomRoutes/home-line.png'),
  },
  {
    name: '채팅',
    component: Chat,
    act: require('@/assets/bottomRoutes/chat-fill.png'),
    none: require('@/assets/bottomRoutes/chat-line.png'),
  },
  {
    name: '등록',
    component: Insert,
    act: require('@/assets/bottomRoutes/insert-fill.png'),
    none: require('@/assets/bottomRoutes/insert-line.png'),
  },
  {
    name: '알람',
    component: Alarm,
    act: require('@/assets/bottomRoutes/alarm-fill.png'),
    none: require('@/assets/bottomRoutes/alarm-line.png'),
  },
  {
    name: '내 정보',
    component: Mypage,
    act: require('@/assets/bottomRoutes/mypage-fill.png'),
    none: require('@/assets/bottomRoutes/mypage-line.png'),
  },
];

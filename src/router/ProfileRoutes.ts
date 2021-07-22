import { RouteRecordRaw } from 'vue-router';
import ProfilePage from '@/components/Profile/ProfilePage.vue';

const ProfileRoutes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage,
  },
];

export default ProfileRoutes;

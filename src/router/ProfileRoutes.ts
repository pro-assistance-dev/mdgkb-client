import { RouteRecordRaw } from 'vue-router';
import ProfilePage from '@/components/Profile/ProfilePage.vue';
import { isAuthorized } from '@/router/index';

const ProfileRoutes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage,
    beforeEnter: isAuthorized,
  },
];

export default ProfileRoutes;

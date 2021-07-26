import { RouteRecordRaw } from 'vue-router';
import ProfileInfoPage from '@/components/Profile/ProfileInfoPage.vue';
import ProfileEditPage from '@/components/Profile/ProfileEditPage.vue';
import { isAuthorized } from '@/router/index';

const ProfileRoutes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'ProfileInfoPage',
    component: ProfileInfoPage,
    beforeEnter: isAuthorized,
    meta: { profile: true },
  },
  {
    path: '/profile/edit',
    name: 'ProfileEditPage',
    component: ProfileEditPage,
    beforeEnter: isAuthorized,
    meta: { profile: true },
  },
];

export default ProfileRoutes;

import { RouteRecordRaw } from 'vue-router';
import ProfileInfoPage from '@/components/Profile/ProfileInfoPage.vue';
import ProfileEditPage from '@/components/Profile/ProfileEditPage.vue';
import { isAuthorized, authGuard } from '@/router/index';

const ProfileRoutes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'ProfileInfoPage',
    component: ProfileInfoPage,
    beforeEnter(to, from, next) {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: { profile: true },
  },
  {
    path: '/profile/edit',
    name: 'ProfileEditPage',
    component: ProfileEditPage,
    beforeEnter(to, from, next) {
      isAuthorized(to, from, next);
      authGuard(to, from, next);
    },
    meta: { profile: true },
  },
];

export default ProfileRoutes;

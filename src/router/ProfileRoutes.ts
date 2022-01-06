import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import ProfileChildrenPage from '@/components/Profile/ProfileChildrenPage.vue';
import ProfileDonor from '@/components/Profile/ProfileDonor.vue';
import ProfileEditPage from '@/components/Profile/ProfileEditPage.vue';
import ProfileInfoPage from '@/components/Profile/ProfileInfoPage.vue';
import ProfileQuestionPage from '@/components/Profile/ProfileQuestionPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

const ProfileRoutes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'ProfileInfoPage',
    component: ProfileInfoPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: { profile: true },
  },
  {
    path: '/profile/edit',
    name: 'ProfileEditPage',
    component: ProfileEditPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: { profile: true },
  },
  {
    path: '/profile/questions',
    name: 'ProfileQuestions',
    component: ProfileQuestionPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: { profile: true },
  },
  {
    path: '/profile/donor',
    name: 'ProfileDonor',
    component: ProfileDonor,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: { profile: true },
  },
  {
    path: '/profile/children',
    name: 'ProfileChildren',
    component: ProfileChildrenPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: { profile: true },
  },
];

export default ProfileRoutes;

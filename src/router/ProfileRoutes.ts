import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import EditApplicationPage from '@/components/Profile/Education/EditApplicationPage.vue';
import EducationPage from '@/components/Profile/Education/EducationPage.vue';
import ProfileSettingsPage from '@/components/Profile/Education/ProfileSettingsPage.vue';
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
      authGuard();
      if (next) isAuthorized(next);
    },
    meta: { protected: true, profile: 'my' },
  },
  {
    path: '/profile/edit',
    name: 'ProfileEditPage',
    component: ProfileEditPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      if (next) isAuthorized(next);
    },
    meta: { protected: true, profile: 'my' },
  },
  {
    path: '/profile/questions',
    name: 'ProfileQuestions',
    component: ProfileQuestionPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      if (next) isAuthorized(next);
    },
    meta: { protected: true, profile: true },
  },
  {
    path: '/profile/donor',
    name: 'ProfileDonor',
    component: ProfileDonor,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      if (next) isAuthorized(next);
    },
    meta: { protected: true, profile: true },
  },
  {
    path: '/profile/children',
    name: 'ProfileChildren',
    component: ProfileChildrenPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: true },
  },
  {
    path: '/profile/education',
    name: 'Education',
    component: EducationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'education' },
  },
  {
    path: '/profile/settings',
    name: 'ProfileSettingsPage',
    component: ProfileSettingsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'settings' },
  },
  {
    path: '/profile/education/applications/:id',
    name: 'EditApplicationPage',
    component: EditApplicationPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'education' },
  },
];

export default ProfileRoutes;

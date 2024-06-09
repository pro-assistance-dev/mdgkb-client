import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

const ProfileChildrenPage = () => import('@/components/Profile/ProfileChildrenPage.vue');
const ProfileDailyMenuOrders = () => import('@/components/Profile/ProfileDailyMenuOrders/ProfileDailyMenuOrders.vue');
const ProfileSettingsPage = () => import('@/components/Profile/ProfileDailyMenuOrders/ProfileSettingsPage.vue');
const ProfileDonor = () => import('@/components/Profile/ProfileDonor.vue');
const ProfileEditPage = () => import('@/components/Profile/ProfileEditPage.vue');
const ProfileInfoPage = () => import('@/components/Profile/ProfileInfoPage.vue');
const ProfileQuestionPage = () => import('@/components/Profile/ProfileQuestionPage.vue');
const CancelResidencyApplication = () => import('@/components/Profile/ProfileResidencyApplications/CancelResidencyApplication.vue');
const EditResidencyApplication = () => import('@/components/Profile/ProfileResidencyApplications/EditResidencyApplication.vue');
const ProfileResidencyApplications = () => import('@/components/Profile/ProfileResidencyApplications/ProfileResidencyApplications.vue');
const EditVacancyResponse = () => import('@/components/Profile/ProfileVacancyResponses/EditVacancyResponse.vue');
const ProfileVacancyResponses = () => import('@/components/Profile/ProfileVacancyResponses/ProfileVacancyResponses.vue');
const QuestionAnswerPage = () => import('@/components/Profile/QuestionAnswerPage.vue');
const UserCommentsPage = () => import('@/components/Profile/UserCommentsPage.vue');
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
    path: '/profile/daily-menu-orders',
    name: 'ProfileDailyMenuOrders',
    component: ProfileDailyMenuOrders,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard(next);
      // isAuthorized(next);
    },
    meta: { protected: true, profile: 'daily-menu-orders' },
  },
  {
    path: '/profile/question-answer',
    name: 'QuestionAnswerPage',
    component: QuestionAnswerPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'question-answer' },
  },
  {
    path: '/profile/user-comments',
    name: 'UserCommentsPage',
    component: UserCommentsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'user-comments' },
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
    path: '/profile/residency-applications',
    name: 'ProfileResidencyApplications',
    component: ProfileResidencyApplications,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'education' },
  },
  {
    path: '/profile/vacancy-responses',
    name: 'ProfileVacancyResponse',
    component: ProfileVacancyResponses,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'vacancy' },
  },
  {
    path: '/profile/vacancy-responses/:id',
    name: 'EditVacancyResponse',
    component: EditVacancyResponse,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'vacancy' },
  },
  {
    path: '/profile/residency-applications/:id',
    name: 'EditResidencyApplication',
    component: EditResidencyApplication,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'education' },
  },
  {
    path: '/profile/residency-applications/cancel/:id',
    name: 'CancelResidencyApplication',
    component: CancelResidencyApplication,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      authGuard();
      isAuthorized(next);
    },
    meta: { protected: true, profile: 'education' },
  },
];

export default ProfileRoutes;

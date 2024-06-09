import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminQuestionPage = () => import('@/components/admin/AdminQuestions/AdminQuestionPage.vue');
const AdminQuestionsList = () => import('@/components/admin/AdminQuestions/AdminQuestionsList.vue');
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/questions',
    name: 'AdminQuestionsList',
    component: AdminQuestionsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/questions/:id',
    name: 'AdminQuestionPage',
    component: AdminQuestionPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];

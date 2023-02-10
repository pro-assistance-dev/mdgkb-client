import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import PaidProgramPage from '@/components/PaidPrograms/PaidProgramPage.vue';
import PaidPrograms from '@/components/PaidPrograms/PaidPrograms.vue';
import { devGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/paid-programs',
    name: 'PaidPrograms',
    component: PaidPrograms,
    // beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    //   isAuthorized(next);
    //   devGuard();
    // },
  },
  {
    path: '/paid-programs/:id',
    name: 'PaidProgramPage',
    component: PaidProgramPage,
    // beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    //   isAuthorized(next);
    //   devGuard();
    // },
  },
];

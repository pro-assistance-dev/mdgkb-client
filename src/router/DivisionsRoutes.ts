import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import DivisionPage from '@/components/Divisions/DivisionPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/divisions/:id',
    name: 'DivisionPage',
    component: DivisionPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];

import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AboutPage from '@/components/About/AboutPage.vue';
import DivisionPage from '@/components/Divisions/DivisionPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/divisions',
    name: 'DivisionsList',
    component: AboutPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/divisions/:id',
    name: 'DivisionPage',
    component: DivisionPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];

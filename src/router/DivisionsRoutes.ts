import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import DivisionPage from '@/components/Divisions/DivisionPage.vue';
import DivisionsCentersList from '@/components/Divisions/DivisionsCentersList.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/divisions',
    name: 'DivisionsList',
    component: DivisionsCentersList,
    // beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    //   isAuthorized(next);
    // },
  },
  {
    path: '/centers',
    name: 'CentersList',
    component: DivisionsCentersList,
    // beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    //   isAuthorized(next);
    // },
  },
  {
    path: '/divisions/:id',
    name: 'DivisionPage',
    component: DivisionPage,
    // beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    //   isAuthorized(next);
    // },
  },
];

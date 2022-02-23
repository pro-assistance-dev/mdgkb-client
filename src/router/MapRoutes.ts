import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import MapPage from '@/components/Map/MapPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/map/:id',
    name: 'MapWithDivision',
    component: MapPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: { main: true },
  },
  {
    path: '/map',
    name: 'Map',
    component: MapPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: { main: true },
  },
];

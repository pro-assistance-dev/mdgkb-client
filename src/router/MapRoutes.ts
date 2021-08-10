import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import MapPage from '@/components/Map/MapPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/map',
    name: 'Map',
    component: MapPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];

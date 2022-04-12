import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import HospitalizationList from '@/components/Hospitalizations/HospitalizationsPage.vue';
import { devGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/hospitalization',
    name: 'HospitalizationList',
    component: HospitalizationList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      devGuard();
    },
  },
];

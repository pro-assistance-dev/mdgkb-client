import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import PaidServices from '@/components/PaidServices/PaidServices.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/paid-services',
    name: 'PaidServices',
    component: PaidServices,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];

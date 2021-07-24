import { isAuthorized } from '@/router/index';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import PaidServices from '@/components/PaidServices/PaidServices.vue';

export default [
  {
    path: '/paid-services',
    name: 'PaidServices',
    component: PaidServices,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
      isAuthorized(to, from, next);
    },
  },
];

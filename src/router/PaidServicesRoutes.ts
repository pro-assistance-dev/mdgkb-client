import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import PaidServicesPage from '@/components/PaidServices/PaidServicesPage.vue';
import { devGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/paid-services',
    name: 'PaidServicesPage',
    component: PaidServicesPage,
  },
];

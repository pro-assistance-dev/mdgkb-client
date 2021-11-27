import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import DoctorPage from '@/components/Doctors/DoctorPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/doctors/:slug',
    name: 'DoctorPage',
    component: DoctorPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];

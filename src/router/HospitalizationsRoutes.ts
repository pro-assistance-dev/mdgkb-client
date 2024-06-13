import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const HospitalizationList = () => import('@/components/Hospitalizations/HospitalizationsPage.vue');
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/hospitalization',
    name: 'HospitalizationList',
    component: HospitalizationList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      // devGuard();
    },
  },
];

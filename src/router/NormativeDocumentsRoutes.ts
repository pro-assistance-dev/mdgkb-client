import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import NormativeDocuments from '@/components/NormativeDocuments/NormativeDocuments.vue';
import { devGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/normative-documents',
    name: 'NormativeDocuments',
    component: NormativeDocuments,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      devGuard();
    },
  },
];

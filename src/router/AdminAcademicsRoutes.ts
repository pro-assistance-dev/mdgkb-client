import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminAcademicsList = () => import('@/components/admin/AdminEducationalOrganization/AdminAcademicsList.vue');
import { authGuard,isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/academics',
    name: 'AdminAcademicsList',
    component: AdminAcademicsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard(next);
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];

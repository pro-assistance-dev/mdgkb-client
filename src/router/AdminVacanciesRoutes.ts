import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminVacanciesList from '@/components/admin/AdminVacancies/AdminVacanciesList.vue';
import AdminVacanciesPage from '@/components/admin/AdminVacancies/AdminVacanciesPage.vue';
import AdminVacancyResponsePage from '@/components/admin/AdminVacancies/AdminVacancyResponsePage.vue';
import { AdminLayout } from '@/interfaces/admin/AdminLayout';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/vacancies',
    name: 'AdminVacanciesList',
    component: AdminVacanciesList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
  {
    path: '/admin/vacancies/new',
    name: 'AdminVacanciesPage',
    component: AdminVacanciesPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/vacancies/:id',
    name: 'AdminVacanciesEdit',
    component: AdminVacanciesPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  // {
  //   path: '/admin/vacancy-responses',
  //   name: 'AdminVacanciesList',
  //   component: AdminVacanciesList,
  //   beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
  //     isAuthorized(next);
  //     authGuard();
  //   },
  //   meta: {
  //     layout: 'AdminLayout',
  //     adminLayout: AdminLayout.TableList,
  //   },
  // },
  {
    path: '/admin/vacancy-responses/new',
    name: 'AdminVacancyResponsePage',
    component: AdminVacancyResponsePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/vacancy-responses/:id',
    name: 'AdminVacancyResponseEdit',
    component: AdminVacancyResponsePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];

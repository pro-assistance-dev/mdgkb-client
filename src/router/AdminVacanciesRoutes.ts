import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminVacanciesList = () => import('@/components/admin/AdminVacancies/AdminVacanciesList.vue');
const AdminVacanciesPage = () => import('@/components/admin/AdminVacancies/AdminVacanciesPage.vue');
const AdminVacanciesResponsesList = () => import('@/components/admin/AdminVacancies/AdminVacanciesResponsesList.vue');
const AdminVacancyResponsePage = () => import('@/components/admin/AdminVacancies/AdminVacancyResponsePage.vue');

import { authGuard, isAuthorized } from '@/router/index';
import { AdminLayout } from '@/services/interfaces/AdminLayout';

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
  {
    path: '/admin/vacancy-responses',
    name: 'AdminVacanciesResponsesList',
    component: AdminVacanciesResponsesList,
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

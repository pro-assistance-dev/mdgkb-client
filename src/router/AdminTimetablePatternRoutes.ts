import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import AdminTimetablePatternList from '@/components/admin/AdminTimetablePatterns/AdminTimetablePatternList.vue';
import AdminTimetablePatternPage from '@/components/admin/AdminTimetablePatterns/AdminTimetablePatternPage.vue';
import { authGuard, isAuthorized } from '@/router/index';

export default [
  {
    path: '/admin/timetable-patterns',
    name: 'AdminTimetablePatternList',
    component: AdminTimetablePatternList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/timetable-patterns/new',
    name: 'AdminTimetablePatternPageCreate',
    component: AdminTimetablePatternPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/timetable-patterns/:id',
    name: 'AdminTimetablePatternPageUpdate',
    component: AdminTimetablePatternPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
    },
  },
];

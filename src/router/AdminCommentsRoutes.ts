import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const AdminCommentList = () => import('@/components/admin/AdminComments/AdminCommentList.vue');
import { authGuard, isAuthorized } from '@/router/index';
import { AdminLayout } from '@/services/interfaces/AdminLayout';

export default [
  {
    path: '/admin/comments',
    name: 'AdminAllCommentList',
    component: AdminCommentList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
      authGuard();
    },
    meta: {
      layout: 'AdminLayout',
      adminLayout: AdminLayout.TableList,
    },
  },
];

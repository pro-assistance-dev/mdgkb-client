import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import CommentsList from '@/components/Comments/CommentsList.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/comments',
    name: 'CommentsList',
    meta: { title: 'Отзывы' },
    component: CommentsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];

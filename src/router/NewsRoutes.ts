import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import NewsList from '@/components/News/NewsList.vue';
import NewsPage from '@/components/News/NewsPage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/news',
    name: 'News',
    component: NewsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: { carousel: true },
  },
  {
    path: '/news/:slug',
    name: 'NewsPage',
    component: NewsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];

import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const NewsList = () => import('@/components/News/NewsList.vue');
const NewsPage = () => import('@/components/News/NewsPage.vue');
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/news',
    name: 'News',
    component: NewsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
    meta: { carousel: true, title: 'Новости' },
  },
  {
    path: '/news/:id',
    name: 'NewsPage',
    meta: { title: 'Новости - ' },
    component: NewsPage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];

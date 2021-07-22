import NewsList from '@/components/News/NewsList.vue';
import NewsPage from '@/components/News/NewsPage.vue';
import { isAuthorized } from '@/router/index';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default [
  {
    path: '/news',
    name: 'News',
    component: NewsList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
      isAuthorized(to, from, next);
    },
  },
  {
    path: '/news/:slug',
    name: 'NewsPage',
    component: NewsPage,
    beforeEnter: isAuthorized,
  },
];

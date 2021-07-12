import NewsList from '@/components/News/NewsList.vue';
import NewsPage from '@/components/News/NewsPage.vue';

export default [
  {
    path: '/news',
    name: 'News',
    component: NewsList,
  },
  {
    path: '/news/:newsId',
    name: 'NewsPage',
    component: NewsPage,
  },
];

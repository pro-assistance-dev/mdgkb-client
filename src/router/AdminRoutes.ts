import AdminNewsList from '@/components/admin/AdminNews/AdminNewsList.vue';
import AdminNewsPage from '@/components/admin/AdminNews/AdminNewsPage.vue';

export default [
  {
    path: '/admin/news',
    name: 'AdminNewsList',
    component: AdminNewsList,
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/news/new',
    name: 'AdminNewsPageNew',
    component: AdminNewsPage,
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/news/:slug',
    name: 'AdminNewsPageEdit',
    component: AdminNewsPage,
    meta: {
      layout: 'AdminLayout',
    },
  },
];

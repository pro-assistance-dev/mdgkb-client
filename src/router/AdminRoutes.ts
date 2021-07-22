import AdminNewsList from '@/components/admin/AdminNews/AdminNewsList.vue';
import AdminNewsItem from '@/components/admin/AdminNews/AdminNewsItem.vue';

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
    path: '/admin/news/item',
    name: 'AdminNewsItem',
    component: AdminNewsItem,
    meta: {
      layout: 'AdminLayout',
    },
  },
];

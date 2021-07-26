import AdminNewsList from '@/components/admin/AdminNews/AdminNewsList.vue';
import AdminNewsPage from '@/components/admin/AdminNews/AdminNewsPage.vue';
import AdminCarouselList from '@/components/admin/AdminCarousel/AdminCarouselList.vue';
import AdminCarouselPage from '@/components/admin/AdminCarousel/AdminCarouselPage.vue';

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
  {
    path: '/admin/carousels',
    name: 'AdminCarouselList',
    component: AdminCarouselList,
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/carousels/new',
    name: 'AdminCarouselPage',
    component: AdminCarouselPage,
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/carousels/:id',
    name: 'AdminCarouselPage',
    component: AdminCarouselPage,
    meta: {
      layout: 'AdminLayout',
    },
  },
];

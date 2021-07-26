import AdminCarouselList from '@/components/admin/AdminCarousel/AdminCarouselList.vue';
import AdminCarouselPage from '@/components/admin/AdminCarousel/AdminCarouselPage.vue';
import AdminNewsList from '@/components/admin/AdminNews/AdminNewsList.vue';
import AdminNewsPage from '@/components/admin/AdminNews/AdminNewsPage.vue';
import AdminNormativeDocumentTypePage from '@/components/admin/NormativeDocuments/AdminNormativeDocumentTypePage.vue';
import AdminNormativeDocumentTypesList from '@/components/admin/NormativeDocuments/AdminNormativeDocumentTypesList.vue';
import AdminNormativeDocumentsList from '@/components/admin/NormativeDocuments/AdminNormativeDocumentsList.vue';

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
    path: '/admin/normative-documents',
    name: 'AdminNormativeDocuments',
    component: AdminNormativeDocumentsList,
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
  {
    path: '/admin/normative-document-types',
    name: 'AdminNormativeDocumentTypes',
    component: AdminNormativeDocumentTypesList,
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/normative-document-types/new',
    name: 'AdminNormativeDocumentTypeNewPage',
    component: AdminNormativeDocumentTypePage,
    props: { isEdit: false },
    meta: {
      layout: 'AdminLayout',
    },
  },
  {
    path: '/admin/normative-document-types/:id',
    name: 'AdminNormativeDocumentTypePage',
    component: AdminNormativeDocumentTypePage,
    props: { isEdit: true },
    meta: {
      layout: 'AdminLayout',
    },
  },
];

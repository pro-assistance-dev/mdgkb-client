import NormativeDocuments from '@/components/NormativeDocuments/NormativeDocuments.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/normative-documents',
    name: 'NormativeDocuments',
    component: NormativeDocuments,
    beforeEnter: isAuthorized,
  },
];

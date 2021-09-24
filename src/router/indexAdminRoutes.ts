import AdminBannersRoutes from '@/router/AdminBannersRoutes';
import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';
import AdminDoctorsRoutes from '@/router/AdminDoctorsRoutes';
import AdminEducationalOrganizationRoutes from '@/router/AdminEducationalOrganizationRoutes';
import AdminNewsRoutes from '@/router/AdminNewsRoutes';

import AdminCarouselsRoutes from './AdminCarouselsRoutes';

export default [
  ...AdminDoctorsRoutes,
  ...AdminCarouselsRoutes,
  ...AdminDictionaryRoutes,
  ...AdminNewsRoutes,
  ...AdminBannersRoutes,
  ...AdminEducationalOrganizationRoutes,
];

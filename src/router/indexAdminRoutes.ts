import AdminBannersRoutes from '@/router/AdminBannersRoutes';
import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';
import AdminDoctorsRoutes from '@/router/AdminDoctorsRoutes';
import AdminEducationalOrganizationRoutes from '@/router/AdminEducationalOrganizationRoutes';
import AdminMenusRoutes from '@/router/AdminMenusRoutes';
import AdminNewsRoutes from '@/router/AdminNewsRoutes';
import AdminPagesRoutes from '@/router/AdminPagesRoutes';

import AdminCarouselsRoutes from './AdminCarouselsRoutes';

export default [
  ...AdminDoctorsRoutes,
  ...AdminCarouselsRoutes,
  ...AdminDictionaryRoutes,
  ...AdminNewsRoutes,
  ...AdminBannersRoutes,
  ...AdminEducationalOrganizationRoutes,
  ...AdminMenusRoutes,
  ...AdminPagesRoutes,
];

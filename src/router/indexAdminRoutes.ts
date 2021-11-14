import AdminBannersRoutes from '@/router/AdminBannersRoutes';
import AdminCarouselsRoutes from '@/router/AdminCarouselsRoutes';
import AdminCommentsRoutes from '@/router/AdminCommentsRoutes';
import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';
import AdminDoctorsRoutes from '@/router/AdminDoctorsRoutes';
import AdminDocumentsRoutes from '@/router/AdminDocumentsRoutes';
import AdminEducationalOrganizationRoutes from '@/router/AdminEducationalOrganizationRoutes';
import AdminMenusRoutes from '@/router/AdminMenusRoutes';
import AdminNewsRoutes from '@/router/AdminNewsRoutes';
import AdminPagesRoutes from '@/router/AdminPagesRoutes';
import AdminVacanciesRoutes from '@/router/AdminVacanciesRoutes';

export default [
  ...AdminDoctorsRoutes,
  ...AdminCarouselsRoutes,
  ...AdminDictionaryRoutes,
  ...AdminNewsRoutes,
  ...AdminBannersRoutes,
  ...AdminEducationalOrganizationRoutes,
  ...AdminMenusRoutes,
  ...AdminPagesRoutes,
  ...AdminVacanciesRoutes,
  ...AdminDocumentsRoutes,
  ...AdminCommentsRoutes,
];

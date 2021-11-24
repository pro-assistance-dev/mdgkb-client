import AdminBannersRoutes from '@/router/AdminBannersRoutes';
import AdminCommentsRoutes from '@/router/AdminCommentsRoutes';
import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';
import AdminDoctorsRoutes from '@/router/AdminDoctorsRoutes';
import AdminDocumentsTypeRoutes from '@/router/AdminDocumentsTypeRoutes';
import AdminEducationalOrganizationRoutes from '@/router/AdminEducationalOrganizationRoutes';
import AdminMenusRoutes from '@/router/AdminMenusRoutes';
import AdminNewsRoutes from '@/router/AdminNewsRoutes';
import AdminNewsSlideRoutes from '@/router/AdminNewsSlideRoutes';
import AdminPagesRoutes from '@/router/AdminPagesRoutes';
import AdminVacanciesRoutes from '@/router/AdminVacanciesRoutes';

export default [
  ...AdminDoctorsRoutes,
  ...AdminDictionaryRoutes,
  ...AdminNewsRoutes,
  ...AdminBannersRoutes,
  ...AdminEducationalOrganizationRoutes,
  ...AdminMenusRoutes,
  ...AdminPagesRoutes,
  ...AdminVacanciesRoutes,
  ...AdminDocumentsTypeRoutes,
  ...AdminCommentsRoutes,
  ...AdminNewsSlideRoutes,
];

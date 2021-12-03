import AdminBannersRoutes from '@/router/AdminBannersRoutes';
import AdminCommentsRoutes from '@/router/AdminCommentsRoutes';
import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';
import AdminDoctorsRoutes from '@/router/AdminDoctorsRoutes';
import AdminDocumentsTypeRoutes from '@/router/AdminDocumentsTypeRoutes';
import AdminEducationalOrganizationRoutes from '@/router/AdminEducationalOrganizationRoutes';
import AdminFaqsRoutes from '@/router/AdminFaqsRoutes';
import AdminMenusRoutes from '@/router/AdminMenusRoutes';
import AdminNewsRoutes from '@/router/AdminNewsRoutes';
import AdminNewsSlideRoutes from '@/router/AdminNewsSlideRoutes';
import AdminPagesRoutes from '@/router/AdminPagesRoutes';
import AdminQuestionsRoutes from '@/router/AdminQuestionsRoutes';
import AdminTimetablePatternRoutes from '@/router/AdminTimetablePatternRoutes';
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
  ...AdminFaqsRoutes,
  ...AdminNewsSlideRoutes,
  ...AdminQuestionsRoutes,
  ...AdminTimetablePatternRoutes,
];

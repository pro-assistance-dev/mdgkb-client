import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';
import AdminDoctorsRoutes from '@/router/AdminDoctorsRoutes';
import AdminNewsRoutes from '@/router/AdminNewsRoutes';

import AdminCarouselsRoutes from './AdminCarouselsRoutes';

export default [...AdminDoctorsRoutes, ...AdminCarouselsRoutes, ...AdminDictionaryRoutes, ...AdminNewsRoutes];

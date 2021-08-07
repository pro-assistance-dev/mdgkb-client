import AdminCarouselsRoutes from './AdminCarouselsRoutes';
import AdminNewsRoutes from '@/router/AdminNewsRoutes';
import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';
import AdminDoctorsRoutes from '@/router/AdminDoctorsRoutes';

export default [...AdminDoctorsRoutes, ...AdminCarouselsRoutes, ...AdminDictionaryRoutes, ...AdminNewsRoutes];

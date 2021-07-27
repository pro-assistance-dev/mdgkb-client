import AdminCarouselsRoutes from './AdminCarouselsRoutes';
import AdminNewsRoutes from '@/router/AdminNewsRoutes';
import AdminDictionaryRoutes from '@/router/AdminDictionaryRoutes';

export default [
  ...AdminCarouselsRoutes,
  ...AdminDictionaryRoutes,
  ...AdminNewsRoutes,
];

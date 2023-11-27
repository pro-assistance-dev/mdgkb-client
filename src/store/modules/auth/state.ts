import User from '@/classes/User';
import IPathPermission from '@/interfaces/IPathPermission';

export default interface State {
  user: User;
  token: string;
  isAuth: boolean;
  showWarning: boolean;
  authOnly: boolean;
  authModalVisible: boolean;
  loginStatus: 'login' | 'register' | 'forgotPassword' | 'passwordChange';
  pathPermissions: IPathPermission[];
  userPathPermissions: IPathPermission[];
  count: number;
}

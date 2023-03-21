import IPathPermission from '@/interfaces/IPathPermission';
import IUser from '@/services/interfaces/IUser';

export default interface State {
  user: IUser;
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

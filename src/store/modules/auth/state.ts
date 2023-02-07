import IPathPermission from '@/interfaces/IPathPermission';
import IUser from '@/interfaces/IUser';

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

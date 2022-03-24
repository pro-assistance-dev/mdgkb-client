import IUser from '@/interfaces/IUser';

export default interface State {
  user: IUser;
  token: string;
  isAuth: boolean;
  authModalVisible: boolean;
  loginStatus: 'login' | 'register' | 'forgotPassword';
}

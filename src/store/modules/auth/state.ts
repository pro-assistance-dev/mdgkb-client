import IUser from '@/interfaces/users/IUser';

export default interface State {
  user?: IUser;
  token: string;
}

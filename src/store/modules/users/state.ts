import IUser from '@/interfaces/users/IUser';

export interface State {
  users: IUser[];
  user?: IUser;
  emailExist: boolean;
  authPageEmail: string;
}

import IUser from '@/interfaces/users/IUser';

export interface State {
  items: IUser[];
  item?: IUser;
  emailExist: boolean;
  authPageEmail: string;
}

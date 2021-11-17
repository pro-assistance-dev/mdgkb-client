import IUser from '@/interfaces/users/IUser';

export interface State {
  items: IUser[];
  item?: IUser;
  emailExists: boolean;
  authPageEmail: string;
}

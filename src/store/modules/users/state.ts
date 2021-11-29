import IUser from '@/interfaces/IUser';

export interface State {
  items: IUser[];
  item?: IUser;
  emailExists: boolean;
  authPageEmail: string;
}

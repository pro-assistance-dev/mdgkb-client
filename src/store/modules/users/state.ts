import User from '@/classes/User';

export interface State {
  items: User[];
  item?: User;
  count: number;
  emailExists: boolean;
  authPageEmail: string;
}

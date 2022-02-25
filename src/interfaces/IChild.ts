import IHuman from '@/interfaces/IHuman';
import IUser from '@/interfaces/IUser';

export default interface IChild {
  id?: string;
  human: IHuman;
  humanId?: string;
  user?: IUser;
  userId?: string;
}

import IUser from '@/interfaces/IUser';
import Human from '@/services/classes/Human';

export default interface IChild {
  id?: string;
  human: Human;
  humanId?: string;
  user?: IUser;
  userId?: string;
}

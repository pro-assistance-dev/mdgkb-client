import Human from '@/services/classes/Human';
import IUser from '@/services/interfaces/IUser';

export default interface IChild {
  id?: string;
  human: Human;
  humanId?: string;
  user?: IUser;
  userId?: string;
}

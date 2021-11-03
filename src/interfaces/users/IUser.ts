import IHuman from '@/interfaces/IHuman';

export default interface IUser {
  id?: string;
  email: string;
  password?: string;
  human: IHuman;
  humanId?: string;
}

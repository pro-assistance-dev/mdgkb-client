import IUser from '@/services/interfaces/IUser';

export default interface ISupportMessage {
  id?: string;
  theme: string;
  question: string;
  answer: string;
  isNew: boolean;
  user: IUser;
  date: Date;
  userId?: string;
  changeNewStatus: (status?: boolean) => void;
}

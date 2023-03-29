import User from '@/classes/User';

export default interface ISupportMessage {
  id?: string;
  theme: string;
  question: string;
  answer: string;
  isNew: boolean;
  user: User;
  date: Date;
  userId?: string;
  changeNewStatus: (status?: boolean) => void;
}

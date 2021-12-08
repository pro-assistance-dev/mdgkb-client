import IUser from '@/interfaces/IUser';

export default interface IQuestion {
  id?: string;
  theme: string;
  question: string;
  originalQuestion: string;
  answer: string;
  originalAnswer: string;
  published: boolean;
  publishAgreement: boolean;
  isNew: boolean;
  date: Date;
  user: IUser;
  userId?: string;
  isOpened: boolean;
  answerIsRead: boolean;
  agreedWithPrivacyPolicy: boolean;

  publish: () => void;
}

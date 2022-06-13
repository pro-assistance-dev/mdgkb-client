import IUser from '@/interfaces/IUser';

export default interface IQuestion {
  id?: string;
  theme: string;
  question: string;
  originalQuestion: string;
  answer: string;
  originalAnswer: string;
  answered: boolean;
  published: boolean;
  publishAgreement: boolean;
  isNew: boolean;
  date: Date;
  user: IUser;
  userId?: string;
  answerIsRead: boolean;
  isDialogOpened: boolean;
  agreedWithPrivacyPolicy: boolean;

  publish: () => void;
  changeNewStatus: (status?: boolean) => void;
  getUpdateButtonText: () => string;
  getUpdateButtonType: () => string;
  getUpdateCondition: () => boolean;
  getThemeOrFirstPhrase: () => string;
}

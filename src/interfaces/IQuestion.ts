import IUser from '@/interfaces/IUser';

import IFileInfo from './files/IFileInfo';

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
  file?: IFileInfo;
  fileId?: string;

  publish: () => void;
  changeNewStatus: (status?: boolean) => void;
  getUpdateButtonText: () => string;
  getUpdateButtonType: () => string;
  getUpdateCondition: () => boolean;
  getThemeOrFirstPhrase: () => string;
  getFileInfos: () => IFileInfo[];
}

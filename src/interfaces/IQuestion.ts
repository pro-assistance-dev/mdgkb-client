export default interface IQuestion {
  id?: string;
  theme: string;
  question: string;
  originalQuestion: string;
  answer: string;
  originalAnswer: string;
  published: boolean;
  toPublish: boolean;
  isNew: boolean;
  date: Date;
  userId?: string;
  isOpened: boolean;
  answerIsRead: boolean;
  agreedWithPrivacyPolicy: boolean;

  publish: () => void;
}

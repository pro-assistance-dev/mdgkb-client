export default interface IQuestion {
  id?: string;
  question: string;
  originalQuestion: string;
  answer: string;
  originalAnswer: string;
  published: boolean;
  isNew: boolean;
  date: Date;
  userId?: string;
  isOpened: boolean;
  answerIsRead: boolean;

  publish: () => void;
}

import IQuestion from '@/interfaces/IQuestion';

export default class Question implements IQuestion {
  id?: string;
  question = '';
  originalQuestion = '';
  answer = '';
  originalAnswer = '';
  published = false;
  isNew = true;
  date = new Date();
  userId?: string;
  isOpened = false;
  answerIsRead = false;

  constructor(i?: IQuestion) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.question = i.question;
    this.originalQuestion = i.originalQuestion;
    this.answer = i.answer;
    this.originalAnswer = i.originalAnswer;
    this.isNew = i.isNew;
    this.published = i.published;
    this.answerIsRead = i.answerIsRead;
  }

  publish(): void {
    if (!this.published) {
      this.published = true;
      this.isNew = false;
      return;
    }
    this.published = false;
  }
}

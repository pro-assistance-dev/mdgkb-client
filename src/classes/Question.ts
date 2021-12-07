import IQuestion from '@/interfaces/IQuestion';

export default class Question implements IQuestion {
  id?: string;
  theme = '';
  question = '';
  originalQuestion = '';
  answer = '';
  originalAnswer = '';
  toPublish = true;
  published = false;
  isNew = true;
  date = new Date();
  userId?: string;
  isOpened = false;
  answerIsRead = false;
  agreedWithPrivacyPolicy = false;

  constructor(i?: IQuestion) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.theme = i.theme;
    this.question = i.question;
    this.originalQuestion = i.originalQuestion;
    this.agreedWithPrivacyPolicy = i.agreedWithPrivacyPolicy;
    this.answer = i.answer;
    this.originalAnswer = i.originalAnswer;
    this.isNew = i.isNew;
    this.toPublish = i.toPublish;
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

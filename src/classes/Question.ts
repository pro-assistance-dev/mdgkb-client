import User from '@/classes/User';
import IQuestion from '@/interfaces/IQuestion';

export default class Question implements IQuestion {
  id?: string;
  theme = '';
  question = '';
  originalQuestion = '';
  answer = '';
  originalAnswer = '';
  publishAgreement = true;
  published = false;
  isNew = true;
  date = new Date();
  user = new User();
  userId?: string;
  isOpened = false;
  answerIsRead = false;
  agreedWithPrivacyPolicy = false;

  constructor(question?: IQuestion) {
    if (!question) {
      return;
    }
    this.id = question.id;
    this.theme = question.theme;
    this.question = question.question;
    if (!this.question) {
      this.question = question.originalQuestion;
    }
    if (question.user) {
      this.user = new User(question.user);
    }
    if (question.date) {
      this.date = new Date(question.date);
    }
    this.originalQuestion = question.originalQuestion;
    this.agreedWithPrivacyPolicy = question.agreedWithPrivacyPolicy;
    this.answer = question.answer;
    this.originalAnswer = question.originalAnswer;
    this.isNew = question.isNew;
    this.publishAgreement = question.publishAgreement;
    this.published = question.published;
    this.answerIsRead = question.answerIsRead;
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

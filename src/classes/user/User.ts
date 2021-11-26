import Human from '@/classes/Human';
import Question from '@/classes/Question';
import IQuestion from '@/interfaces/IQuestion';
import IUser from '@/interfaces/users/IUser';

export default class User implements IUser {
  id?: string;
  email = '';
  password?: string = '';

  human = new Human();
  humanId?: string;
  questions: IQuestion[] = [];
  constructor(i?: IUser) {
    if (!i) return;
    this.id = i.id;
    this.email = i.email;
    this.password = i.password;

    this.human = new Human(i.human);
    this.humanId = i.humanId;
    if (i.questions) {
      this.questions = i.questions.map((item: IQuestion) => new Question(item));
    }
  }

  hasNewAnswers(): boolean {
    return this.questions.some((question: IQuestion) => !question.answerIsRead);
  }

  countNewAnswers(): number {
    return this.questions.filter((question: IQuestion) => !question.answerIsRead).length;
  }

  readAllAnswers(): void {
    this.questions.forEach((question: IQuestion) => (question.answerIsRead = true));
  }
}

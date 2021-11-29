import Child from '@/classes/Child';
import Human from '@/classes/Human';
import Question from '@/classes/Question';
import IChild from '@/interfaces/IChild';
import IQuestion from '@/interfaces/IQuestion';
import IUser from '@/interfaces/IUser';

export default class User implements IUser {
  id?: string;
  email = '';
  password?: string = '';

  human = new Human();
  humanId?: string;
  questions: IQuestion[] = [];
  children: IChild[] = [];
  childrenForDelete: string[] = [];
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
    if (i.children) {
      this.children = i.children.map((item: IChild) => new Child(item));
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

  addChild(): void {
    this.children.push(new Child());
  }

  removeChild(index: number): void {
    const idForDelete = this.children[index].id;
    if (idForDelete) {
      this.childrenForDelete.push(idForDelete);
    }
    this.children.splice(index, 1);
  }
}

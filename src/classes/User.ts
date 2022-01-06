import Child from '@/classes/Child';
import DonorRule from '@/classes/DonorRule';
import DonorRuleUser from '@/classes/DonorRuleUser';
import Human from '@/classes/Human';
import Question from '@/classes/Question';
import IChild from '@/interfaces/IChild';
import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRuleUser from '@/interfaces/IDonorRuleUser';
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
  donorRulesUsers: IDonorRuleUser[] = [];

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
    if (i.donorRulesUsers) {
      this.donorRulesUsers = i.donorRulesUsers.map((item: IDonorRuleUser) => new DonorRuleUser(item));
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

  getDonorRules(): IDonorRule[] {
    return this.donorRulesUsers.map((item: IDonorRuleUser) => new DonorRule(item.donorRule));
  }

  removeDonorRule(ruleId: string): void {
    const index = this.donorRulesUsers.findIndex((item: IDonorRuleUser) => item.donorRuleId === ruleId);
    if (index > -1) {
      this.donorRulesUsers.splice(index, 1);
    }
  }
}

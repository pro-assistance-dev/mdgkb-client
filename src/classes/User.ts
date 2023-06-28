import CandidateApplication from '@/classes/CandidateApplication';
import Child from '@/classes/Child';
import Comment from '@/classes/Comment';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import DoctorUser from '@/classes/DoctorUser';
import DonorRule from '@/classes/DonorRule';
import DonorRuleUser from '@/classes/DonorRuleUser';
import DpoApplication from '@/classes/DpoApplication';
import PostgraduateApplication from '@/classes/PostgraduateApplication';
import Question from '@/classes/Question';
import ResidencyApplication from '@/classes/ResidencyApplication';
import IComment from '@/interfaces/comments/IComment';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import IChild from '@/interfaces/IChild';
import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRuleUser from '@/interfaces/IDonorRuleUser';
import IQuestion from '@/interfaces/IQuestion';
import IOption from '@/interfaces/schema/IOption';
import Human from '@/services/classes/Human';
import Role from '@/services/classes/Role';
import ClassHelper from '@/services/ClassHelper';
import IUser from '@/services/interfaces/IUser';

import Form from './Form';

export default class User implements IUser {
  id?: string;
  email = '';
  password?: string = '';
  phone = '';
  human = new Human();
  humanId?: string;
  role = new Role();
  roleId?: string;
  rejectEmail = false;
  @ClassHelper.GetClassConstructor(Question)
  questions: IQuestion[] = [];
  @ClassHelper.GetClassConstructor(Comment)
  comments: IComment[] = [];
  @ClassHelper.GetClassConstructor(Child)
  children: IChild[] = [];
  childrenForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(DonorRuleUser)
  donorRulesUsers: IDonorRuleUser[] = [];
  @ClassHelper.GetClassConstructor(DoctorUser)
  doctorsUsers: DoctorUser[] = [];
  @ClassHelper.GetClassConstructor(DpoApplication)
  dpoApplications: DpoApplication[] = [];
  dpoApplicationsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PostgraduateApplication)
  postgraduateApplications: PostgraduateApplication[] = [];
  postgraduateApplicationsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(CandidateApplication)
  candidateApplications: ICandidateApplication[] = [];
  candidateApplicationsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(Form)
  formValues: Form[] = [];
  createdAt?: Date;
  @ClassHelper.GetClassConstructor(DailyMenuOrder)
  dailyMenuOrders: DailyMenuOrder[] = [];

  @ClassHelper.GetClassConstructor(ResidencyApplication)
  residencyApplications: ResidencyApplication[] = [];

  constructor(i?: User) {
    ClassHelper.BuildClass(this, i);
  }

  hasNewAnswers(): boolean {
    return this.questions.some((question: IQuestion) => question.hasNewAnswer());
  }

  countNewAnswers(): number {
    return this.questions.filter((question: IQuestion) => question.hasNewAnswer()).length;
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

  addDpoApplication(): void {
    this.dpoApplications.push(new DpoApplication());
  }

  removeDpoApplication(index: number): void {
    const idForDelete = this.dpoApplications[index].id;
    if (idForDelete) {
      this.dpoApplicationsForDelete.push(idForDelete);
    }
    this.dpoApplications.splice(index, 1);
  }

  addCandidateApplication(): void {
    this.candidateApplications.push(new CandidateApplication());
  }

  removeCandidateApplication(index: number): void {
    const idForDelete = this.candidateApplications[index].id;
    if (idForDelete) {
      this.candidateApplicationsForDelete.push(idForDelete);
    }
    this.candidateApplications.splice(index, 1);
  }

  addPostgraduateApplication(): void {
    this.postgraduateApplications.push(new PostgraduateApplication());
  }

  removePostgraduateApplication(index: number): void {
    const idForDelete = this.dpoApplications[index].id;
    if (idForDelete) {
      this.dpoApplicationsForDelete.push(idForDelete);
    }
    this.dpoApplications.splice(index, 1);
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(this.human.photo);
    return fileInfos;
  }

  setDefaultRole(options: IOption[]): void {
    this.roleId = options.find(
      (option) => option.label === 'Пользователь' || option.value === '8dac3c71-43e1-476b-82fa-454313684685'
    )?.value;
  }

  getNotViewedApplicationsCount(): number {
    let result = 0;
    this.formValues.forEach((el) => {
      if (!el.viewedByUser) {
        result += 1;
      }
    });
    return result;
  }

  setApplicationsViewed(): void {
    this.formValues.forEach((el) => {
      el.viewedByUser = true;
    });
  }
  setAnswersViewed(): void {
    this.questions.forEach((el) => {
      el.answerIsRead = true;
    });
  }

  setResidencyApplicationsViewed(): void {
    this.residencyApplications.forEach((el) => {
      el.formValue.viewedByUser = true;
    });
  }

  hasComments(): boolean {
    return this.comments.length > 0;
  }

  getHuman(): Human {
    return this.human;
  }

  getNotViewedDailyMenuOrders(): number {
    let result = 0;
    this.dailyMenuOrders.forEach((d) => {
      if (!d.formValue.viewedByUser) {
        result += 1;
      }
    });
    return result;
  }
}

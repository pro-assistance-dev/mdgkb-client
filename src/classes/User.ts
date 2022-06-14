import CandidateApplication from '@/classes/CandidateApplication';
import Child from '@/classes/Child';
import DoctorUser from '@/classes/DoctorUser';
import DonorRule from '@/classes/DonorRule';
import DonorRuleUser from '@/classes/DonorRuleUser';
import DpoApplication from '@/classes/DpoApplication';
import Human from '@/classes/Human';
import PostgraduateApplication from '@/classes/PostgraduateApplication';
import Question from '@/classes/Question';
import Role from '@/classes/Role';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import IChild from '@/interfaces/IChild';
import IDoctorUser from '@/interfaces/IDoctorUser';
import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRuleUser from '@/interfaces/IDonorRuleUser';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IForm from '@/interfaces/IForm';
import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';
import IQuestion from '@/interfaces/IQuestion';
import IUser from '@/interfaces/IUser';
import IOption from '@/interfaces/schema/IOption';

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
  questions: IQuestion[] = [];
  children: IChild[] = [];
  childrenForDelete: string[] = [];
  donorRulesUsers: IDonorRuleUser[] = [];
  doctorsUsers: IDoctorUser[] = [];
  dpoApplications: IDpoApplication[] = [];
  dpoApplicationsForDelete: string[] = [];
  postgraduateApplications: IPostgraduateApplication[] = [];
  postgraduateApplicationsForDelete: string[] = [];
  candidateApplications: ICandidateApplication[] = [];
  candidateApplicationsForDelete: string[] = [];
  formValues: IForm[] = [];

  constructor(i?: IUser) {
    if (!i) return;
    this.id = i.id;
    this.email = i.email;
    this.password = i.password;
    this.phone = i.phone;
    this.rejectEmail = i.rejectEmail;
    if (i.human) {
      this.human = new Human(i.human);
    }
    this.humanId = i.humanId;
    if (i.role) {
      this.role = new Role(i.role);
    }
    this.roleId = i.roleId;
    if (i.questions) {
      this.questions = i.questions.map((item: IQuestion) => new Question(item));
    }
    if (i.children) {
      this.children = i.children.map((item: IChild) => new Child(item));
    }
    if (i.donorRulesUsers) {
      this.donorRulesUsers = i.donorRulesUsers.map((item: IDonorRuleUser) => new DonorRuleUser(item));
    }
    if (i.doctorsUsers) {
      this.doctorsUsers = i.doctorsUsers.map((item: IDoctorUser) => new DoctorUser(item));
    }
    if (i.dpoApplications) {
      this.dpoApplications = i.dpoApplications.map((item: IDpoApplication) => new DpoApplication(item));
    }
    if (i.postgraduateApplications) {
      this.postgraduateApplications = i.postgraduateApplications.map((item: IPostgraduateApplication) => new PostgraduateApplication(item));
    }
    if (i.candidateApplications) {
      this.candidateApplications = i.candidateApplications.map((item: ICandidateApplication) => new CandidateApplication(item));
    }
    if (i.formValues) {
      this.formValues = i.formValues.map((item: IForm) => new Form(item));
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
      if (el.viewedByUser === false) result += 1;
    });
    return result;
  }

  setApplicationsViewed(): void {
    this.formValues.forEach((el) => {
      el.viewedByUser = true;
    });
  }
}

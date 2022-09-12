import IComment from '@/interfaces/comments/IComment';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IChild from '@/interfaces/IChild';
import IDoctorUser from '@/interfaces/IDoctorUser';
import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRuleUser from '@/interfaces/IDonorRuleUser';
import IHuman from '@/interfaces/IHuman';
import IQuestion from '@/interfaces/IQuestion';
import IRole from '@/interfaces/IRole';

import ICandidateApplication from './ICandidateApplication';
import IDpoApplication from './IDpoApplication';
import IForm from './IForm';
import IPostgraduateApplication from './IPostgraduateApplication';
import IOption from './schema/IOption';

export default interface IUser {
  id?: string;
  email: string;
  phone: string;
  password?: string;
  human: IHuman;
  humanId?: string;
  questions: IQuestion[];
  comments: IComment[];
  children: IChild[];
  childrenForDelete: string[];
  dpoApplications: IDpoApplication[];
  dpoApplicationsForDelete: string[];
  postgraduateApplications: IPostgraduateApplication[];
  postgraduateApplicationsForDelete: string[];
  candidateApplications: ICandidateApplication[];
  candidateApplicationsForDelete: string[];
  formValues: IForm[];
  donorRulesUsers: IDonorRuleUser[];
  doctorsUsers: IDoctorUser[];
  role: IRole;
  rejectEmail: boolean;
  roleId?: string;
  hasNewAnswers: () => boolean;
  countNewAnswers: () => number;
  readAllAnswers: () => void;
  createdAt?: Date;
  addChild: () => void;
  removeChild: (index: number) => void;

  getDonorRules: () => IDonorRule[];
  removeDonorRule: (ruleId: string) => void;
  getFileInfos: () => IFileInfo[];
  setDefaultRole: (options: IOption[]) => void;

  getNotViewedApplicationsCount: () => number;
  setApplicationsViewed: () => void;
  setAnswersViewed: () => void;
  hasComments: () => boolean;
}

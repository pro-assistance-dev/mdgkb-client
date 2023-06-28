import DoctorUser from '@/classes/DoctorUser';
import DpoApplication from '@/classes/DpoApplication';
import Form from '@/classes/Form';
import PostgraduateApplication from '@/classes/PostgraduateApplication';
import ResidencyApplication from '@/classes/ResidencyApplication';
import IComment from '@/interfaces/comments/IComment';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IChild from '@/interfaces/IChild';
import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRuleUser from '@/interfaces/IDonorRuleUser';
import IQuestion from '@/interfaces/IQuestion';
import Human from '@/services/classes/Human';
import Role from '@/services/classes/Role';

import ICandidateApplication from '../../interfaces/ICandidateApplication';
import IOption from '../../interfaces/schema/IOption';

export default interface IUser {
  id?: string;
  email: string;
  phone: string;
  password?: string;
  human: Human;
  humanId?: string;
  questions: IQuestion[];
  comments: IComment[];
  children: IChild[];
  childrenForDelete: string[];
  dpoApplications: DpoApplication[];
  dpoApplicationsForDelete: string[];
  postgraduateApplications: PostgraduateApplication[];
  postgraduateApplicationsForDelete: string[];
  candidateApplications: ICandidateApplication[];
  residencyApplications: ResidencyApplication[];
  candidateApplicationsForDelete: string[];
  formValues: Form[];
  donorRulesUsers: IDonorRuleUser[];
  doctorsUsers: DoctorUser[];
  role: Role;
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
  getHuman: () => Human;
}

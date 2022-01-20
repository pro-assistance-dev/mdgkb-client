import IChild from '@/interfaces/IChild';
import IDoctorUser from '@/interfaces/IDoctorUser';
import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRuleUser from '@/interfaces/IDonorRuleUser';
import IHuman from '@/interfaces/IHuman';
import IQuestion from '@/interfaces/IQuestion';

export default interface IUser {
  id?: string;
  email: string;
  password?: string;
  human: IHuman;
  humanId?: string;
  questions: IQuestion[];
  children: IChild[];
  childrenForDelete: string[];
  donorRulesUsers: IDonorRuleUser[];
  doctorsUsers: IDoctorUser[];

  hasNewAnswers: () => boolean;
  countNewAnswers: () => number;
  readAllAnswers: () => void;

  addChild: () => void;
  removeChild: (index: number) => void;

  getDonorRules: () => IDonorRule[];
  removeDonorRule: (ruleId: string) => void;
}

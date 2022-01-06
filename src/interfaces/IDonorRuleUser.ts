import IDonorRule from '@/interfaces/IDonorRule';

export default interface IDonorRuleUser {
  id?: string;
  userId?: string;
  donorRuleId?: string;
  donorRule: IDonorRule;
}

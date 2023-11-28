import DonorRule from '@/classes/DonorRule';
import ClassHelper from '@/services/ClassHelper';

export default class DonorRuleUser {
  id?: string;
  userId?: string;
  donorRuleId?: string;
  donorRule: DonorRule = new DonorRule();

  constructor(i?: DonorRuleUser) {
    ClassHelper.BuildClass(this, i);
  }
}

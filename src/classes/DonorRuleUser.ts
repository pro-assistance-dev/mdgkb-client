import DonorRule from '@/classes/DonorRule';
import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRuleUser from '@/interfaces/IDonorRuleUser';

export default class DonorRuleUser implements IDonorRuleUser {
  id?: string;
  userId?: string;
  donorRuleId?: string;
  donorRule: IDonorRule = new DonorRule();
  constructor(i?: IDonorRuleUser) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.userId = i.userId;
    this.donorRuleId = i.donorRuleId;
    if (i.donorRule) {
      this.donorRule = new DonorRule(i.donorRule);
    }
  }
}

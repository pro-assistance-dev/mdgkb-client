import IPaidProgramOption from '@/interfaces/IPaidProgramOption';

export default class PaidProgramOption implements IPaidProgramOption {
  id?: string;
  name = '';
  paidProgramOptionsGroupId?: string;
  selected = false;
  available = true;
  order = 0;

  constructor(i?: PaidProgramOption) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.order = i.order;
    this.name = i.name;
    this.paidProgramOptionsGroupId = i.paidProgramOptionsGroupId;
  }
}

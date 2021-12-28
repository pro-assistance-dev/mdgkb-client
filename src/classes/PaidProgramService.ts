import IPaidProgramService from '@/interfaces/IPaidProgramService';

export default class PaidProgramService implements IPaidProgramService {
  id?: string;
  name = '';
  quantity = '';
  paidProgramServicesGroupId?: string;
  order = 0;

  constructor(i?: IPaidProgramService) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.quantity = i.quantity;
    this.paidProgramServicesGroupId = i.paidProgramServicesGroupId;
    this.order = i.order;
  }
}

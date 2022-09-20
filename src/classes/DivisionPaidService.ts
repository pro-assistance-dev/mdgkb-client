import Division from '@/classes/Division';
import PaidService from '@/classes/PaidService';
import IDivision from '@/interfaces/IDivision';
import IDivisionPaidService from '@/interfaces/IDivisionPaidService';
import IPaidService from '@/interfaces/IPaidService';

export default class DivisionPaidService implements IDivisionPaidService {
  id?: string;
  divisionId?: string;
  division?: IDivision;
  paidServiceId?: string;
  paidService: IPaidService = new PaidService();

  constructor(i?: IDivisionPaidService) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.divisionId = i.divisionId;
    this.paidServiceId = i.paidServiceId;
    if (i.division) {
      this.division = new Division(i.division);
    }
    if (i.paidService) {
      this.paidService = new PaidService(i.paidService);
    }
  }
}

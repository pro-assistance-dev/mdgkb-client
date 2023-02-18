import Division from '@/classes/Division';
import PaidService from '@/classes/PaidService';
import IDivisionPaidService from '@/interfaces/IDivisionPaidService';
import IPaidService from '@/interfaces/IPaidService';
import ClassHelper from '@/services/ClassHelper';

export default class DivisionPaidService implements IDivisionPaidService {
  id?: string;
  divisionId?: string;
  division?: Division;
  paidServiceId?: string;
  paidService: IPaidService = new PaidService();

  constructor(i?: IDivisionPaidService) {
    ClassHelper.BuildClass(this, i);
  }
}

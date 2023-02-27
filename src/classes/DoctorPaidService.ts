import PaidService from '@/classes/PaidService';
import IPaidService from '@/interfaces/IPaidService';
import ClassHelper from '@/services/ClassHelper';

export default class DoctorPaidService {
  id?: string;
  doctorId?: string;
  paidServiceId?: string;
  paidService: IPaidService = new PaidService();

  constructor(i?: DoctorPaidService) {
    ClassHelper.BuildClass(this, i);
  }
}

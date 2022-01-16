import Doctor from '@/classes/Doctor';
import PaidService from '@/classes/PaidService';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorPaidService from '@/interfaces/IDoctorPaidService';
import IPaidService from '@/interfaces/IPaidService';

export default class DoctorPaidService implements IDoctorPaidService {
  id?: string;
  doctorId?: string;
  doctor?: IDoctor;
  paidServiceId?: string;
  paidService: IPaidService = new PaidService();

  constructor(i?: IDoctorPaidService) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.doctorId = i.doctorId;
    this.paidServiceId = i.paidServiceId;
    if (i.doctor) {
      this.doctor = new Doctor(i.doctor);
    }
    if (i.paidService) {
      this.paidService = new PaidService(i.paidService);
    }
  }
}

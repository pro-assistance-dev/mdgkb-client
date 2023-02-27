import Doctor from '@/classes/Doctor';
import ClassHelper from '@/services/ClassHelper';

export default class DoctorUser {
  id?: string;
  userId?: string;
  doctorId?: string;
  doctor: Doctor = new Doctor();
  constructor(i?: DoctorUser) {
    ClassHelper.BuildClass(this, i);
  }
}

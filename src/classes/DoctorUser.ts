import Doctor from '@/classes/Doctor';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorUser from '@/interfaces/IDoctorUser';

export default class DoctorUser implements IDoctorUser {
  id?: string;
  userId?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();
  constructor(i?: IDoctorUser) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.userId = i.userId;
    this.doctorId = i.doctorId;
    if (i.doctor) {
      this.doctor = new Doctor(i.doctor);
    }
  }
}

import Doctor from '@/classes/Doctor';
import IDoctor from '@/interfaces/IDoctor';
import IEducationalManager from '@/interfaces/IEducationalManager';

export default class EducationalManager implements IEducationalManager {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();
  role = '';
  managerOrder = 0;

  constructor(i?: IEducationalManager) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.doctorId = i.doctorId;
    if (i.doctor) {
      this.doctor = new Doctor(i.doctor);
    }
    this.role = i.role;
    this.managerOrder = i.managerOrder;
  }
}

import Doctor from '@/classes/Doctor';
import IDoctor from '@/interfaces/IDoctor';
import ITeacher from '@/interfaces/ITeacher';

export default class Teacher implements ITeacher {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();
  position = '';

  constructor(i?: ITeacher) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.doctorId = i.doctorId;
    this.position = i.position;
    if (i.doctor) {
      this.doctor = new Doctor(i.doctor);
    }
  }
}

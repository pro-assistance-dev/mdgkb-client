import Doctor from '@/classes/Doctor';
import DpoCourse from '@/classes/DpoCourse';
import IDoctor from '@/interfaces/IDoctor';
import IDpoCourse from '@/interfaces/IDpoCourse';
import ITeacher from '@/interfaces/ITeacher';

export default class Teacher implements ITeacher {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();
  position = '';
  dpoCourses: IDpoCourse[] = [];

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
    if (i.dpoCourses) {
      this.dpoCourses = i.dpoCourses.map((item: IDpoCourse) => new DpoCourse(item));
    }
  }
}

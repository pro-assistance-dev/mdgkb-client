import Division from '@/classes/Division';
import Doctor from '@/classes/Doctor';
import ClassHelper from '@/services/ClassHelper';

export default class DoctorDivision {
  id?: string;
  doctorId?: string;
  doctor: Doctor = new Doctor();
  divisionId?: string;
  division: Division = new Division();
  show = true;

  constructor(i?: DoctorDivision) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'doctorDivision';
  }
}

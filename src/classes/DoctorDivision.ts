import Division from '@/classes/Division';
import Doctor from '@/classes/Doctor';
import IDoctorDivision from '@/interfaces/IDoctorDivision';
import ClassHelper from '@/services/ClassHelper';

export default class DoctorDivision {
  id?: string;
  doctorId?: string;
  doctor: Doctor = new Doctor();
  divisionId?: string;
  division: Division = new Division();
  show = true;

  constructor(i?: IDoctorDivision) {
    ClassHelper.BuildClass(this, i);
  }
}

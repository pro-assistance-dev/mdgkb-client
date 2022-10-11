import Division from '@/classes/Division';
import Doctor from '@/classes/Doctor';
import IDivision from '@/interfaces/IDivision';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorDivision from '@/interfaces/IDoctorDivision';

export default class DoctorDivision implements IDoctorDivision {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();
  divisionId?: string;
  division: IDivision = new Division();

  constructor(i?: IDoctorDivision) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.doctorId = i.doctorId;
    this.divisionId = i.divisionId;
    if (i.doctor) {
      this.doctor = new Doctor(i.doctor);
    }
    if (i.division) {
      this.division = new Division(i.division);
    }
  }
}

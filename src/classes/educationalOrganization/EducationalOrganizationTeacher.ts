import Doctor from '@/classes/Doctor';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';
import IDoctor from '@/interfaces/IDoctor';

export default class EducationalOrganizationTeacher implements IEducationalOrganizationTeacher {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();
  position = '';

  constructor(i?: IEducationalOrganizationTeacher) {
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

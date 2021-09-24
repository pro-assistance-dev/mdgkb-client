import Doctor from '@/classes/doctors/Doctor';
import IDoctor from '@/interfaces/doctors/IDoctor';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';

export default class EducationalOrganizationTeacher implements IEducationalOrganizationTeacher {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();

  constructor(educationalOrganizationTeacher?: IEducationalOrganizationTeacher) {
    if (!educationalOrganizationTeacher) {
      return;
    }
    this.doctorId = educationalOrganizationTeacher.doctorId;
    if (educationalOrganizationTeacher.doctor) {
      this.doctor = new Doctor(educationalOrganizationTeacher.doctor);
    }
  }
}

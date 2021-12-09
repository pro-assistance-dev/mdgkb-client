import Doctor from '@/classes/Doctor';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';
import IDoctor from '@/interfaces/IDoctor';

export default class EducationalOrganizationTeacher implements IEducationalOrganizationTeacher {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();

  constructor(educationalOrganizationTeacher?: IEducationalOrganizationTeacher) {
    if (!educationalOrganizationTeacher) {
      return;
    }
    this.id = educationalOrganizationTeacher.id;
    this.doctorId = educationalOrganizationTeacher.doctorId;
    if (educationalOrganizationTeacher.doctor) {
      this.doctor = new Doctor(educationalOrganizationTeacher.doctor);
    }
  }
}

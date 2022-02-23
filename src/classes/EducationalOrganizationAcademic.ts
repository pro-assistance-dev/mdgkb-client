import Doctor from '@/classes/Doctor';
import IEducationalOrganizationAcademic from '@/interfaces/educationalOrganization/IEducationalOrganizationAcademic';
import IDoctor from '@/interfaces/IDoctor';

export default class EducationalOrganizationAcademic implements IEducationalOrganizationAcademic {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();

  constructor(i?: IEducationalOrganizationAcademic) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.doctorId = i.doctorId;
    if (i.doctor) {
      this.doctor = new Doctor(i.doctor);
    }
  }
}

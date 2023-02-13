import Doctor from '@/classes/Doctor';
import IDoctor from '@/interfaces/IDoctor';
import ClassHelper from '@/services/ClassHelper';

export default class EducationalOrganizationAcademic {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();

  fullName?: string;
  constructor(i?: EducationalOrganizationAcademic) {
    ClassHelper.BuildClass(this, i);
  }
}

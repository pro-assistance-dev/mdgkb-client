import Doctor from '@/classes/doctors/Doctor';
import IDoctor from '@/interfaces/doctors/IDoctor';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';

export default class EducationalOrganizationManager implements IEducationalOrganizationManager {
  id?: string;
  doctorId?: string;
  doctor: IDoctor = new Doctor();
  role = '';
  managerOrder = 0;

  constructor(educationalOrganizationManager?: IEducationalOrganizationManager) {
    if (!educationalOrganizationManager) {
      return;
    }
    this.doctorId = educationalOrganizationManager.doctorId;
    if (educationalOrganizationManager.doctor) {
      this.doctor = new Doctor(educationalOrganizationManager.doctor);
    }
    this.role = educationalOrganizationManager.role;
    this.managerOrder = educationalOrganizationManager.managerOrder;
  }
}

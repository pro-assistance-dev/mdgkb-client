import Doctor from '@/classes/Doctor';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import IDoctor from '@/interfaces/IDoctor';

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
    this.id = educationalOrganizationManager.id;
    this.doctorId = educationalOrganizationManager.doctorId;
    if (educationalOrganizationManager.doctor) {
      this.doctor = new Doctor(educationalOrganizationManager.doctor);
    }
    this.role = educationalOrganizationManager.role;
    this.managerOrder = educationalOrganizationManager.managerOrder;
  }
}

import IDoctor from '@/interfaces/doctors/IDoctor';

export default interface IEducationalOrganizationManager {
  id?: string;
  doctorId?: string;
  doctor: IDoctor;
  role: string;
  managerOrder: number;
}

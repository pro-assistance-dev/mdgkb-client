import IDoctor from '@/interfaces/IDoctor';

export default interface IEducationalOrganizationManager {
  id?: string;
  doctorId?: string;
  doctor: IDoctor;
  role: string;
  managerOrder: number;
}

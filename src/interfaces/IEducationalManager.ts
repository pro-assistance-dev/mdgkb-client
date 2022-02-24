import IDoctor from '@/interfaces/IDoctor';

export default interface IEducationalManager {
  id?: string;
  doctorId?: string;
  doctor: IDoctor;
  role: string;
  managerOrder: number;
}

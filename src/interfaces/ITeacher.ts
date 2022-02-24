import IDoctor from '@/interfaces/IDoctor';

export default interface ITeacher {
  id?: string;
  doctorId?: string;
  doctor: IDoctor;
  position: string;
}

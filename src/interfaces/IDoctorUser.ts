import IDoctor from '@/interfaces/IDoctor';

export default interface IDoctorUser {
  id?: string;
  userId?: string;
  doctorId?: string;
  doctor: IDoctor;
}

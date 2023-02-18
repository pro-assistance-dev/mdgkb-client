import Division from '@/classes/Division';
import IDoctor from '@/interfaces/IDoctor';

export default interface IDoctorDivision {
  id?: string;
  divisionId?: string;
  division?: Division;
  doctorId?: string;
  doctor: IDoctor;
  show: boolean;
}

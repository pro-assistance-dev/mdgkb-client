import IDivision from '@/interfaces/IDivision';
import IDoctor from '@/interfaces/IDoctor';

export default interface IDoctorDivision {
  id?: string;
  divisionId?: string;
  division?: IDivision;
  doctorId?: string;
  doctor: IDoctor;
  show: boolean;
}

import IDoctor from '@/interfaces/IDoctor';
import IPaidService from '@/interfaces/IPaidService';

export default interface IDoctorPaidService {
  id?: string;
  doctor?: IDoctor;
  doctorId?: string;
  paidService?: IPaidService;
  paidServiceId?: string;
}

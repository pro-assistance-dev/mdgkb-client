import IFileInfo from '@/interfaces/files/IFileInfo';
import IChild from '@/interfaces/IChild';
import IDoctor from '@/interfaces/IDoctor';
import ISpecialization from '@/interfaces/ISpecialization';
import IUser from '@/interfaces/IUser';

export default interface IAppointment {
  id?: string;
  date: Date;
  time: string;
  clinicName: string;
  clinicReferralNumber: string;
  formScan?: IFileInfo;
  formScanId?: string;
  specialization?: ISpecialization;
  specializationId?: string;
  doctorId?: string;
  doctor?: IDoctor;
  oms: boolean;
  mrt: boolean;
  mrtZone: string;
  mrtAnesthesia: boolean;
  user?: IUser;
  userId?: string;
  child?: IChild;
  childId?: string;
}

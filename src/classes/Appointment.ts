import Child from '@/classes/Child';
import Doctor from '@/classes/Doctor';
import FileInfo from '@/classes/File/FileInfo';
import Specialization from '@/classes/specializations/Specialization';
import User from '@/classes/User';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IAppointment from '@/interfaces/IAppointment';
import IChild from '@/interfaces/IChild';
import IDoctor from '@/interfaces/IDoctor';
import IUser from '@/interfaces/IUser';
import ISpecialization from '@/interfaces/specialization/ISpecialization';
import TokenService from '@/services/Token';

export default class Appointment implements IAppointment {
  id?: string;
  date = new Date();
  time = '9:00';
  clinicName = '';
  clinicReferralNumber = '';
  formScan?: IFileInfo;
  formScanId?: string;
  specialization?: ISpecialization;
  specializationId?: string;
  doctorId?: string;
  doctor?: IDoctor;
  oms = true;
  mrt = false;
  mrtZone = '';
  mrtAnesthesia = false;

  user?: IUser;
  userId?: string;
  child?: IChild;
  childId?: string;

  constructor(i?: IAppointment) {
    if (!i) {
      if (TokenService.isAuth()) {
        this.user = new User(TokenService.getUser());
      }
      return;
    }
    this.id = i.id;
    this.date = i.date;
    this.time = i.time;
    this.clinicName = i.clinicName;
    this.clinicReferralNumber = i.clinicReferralNumber;
    this.formScanId = i.formScanId;
    if (i.formScan) {
      this.formScan = new FileInfo(i.formScan);
    }
    this.specializationId = i.specializationId;
    if (i.specialization) {
      this.specialization = new Specialization(i.formScan);
    }
    this.doctorId = i.doctorId;
    if (i.doctor) {
      this.doctor = new Doctor(i.doctor);
    }
    this.oms = i.oms;
    this.mrt = i.mrt;
    this.mrtZone = i.mrtZone;
    this.mrtAnesthesia = i.mrtAnesthesia;
    this.userId = i.userId;
    if (i.user) {
      this.user = new User(i.user);
    }
    this.childId = i.childId;
    if (i.child) {
      this.child = new Child(i.child);
    }
  }
}

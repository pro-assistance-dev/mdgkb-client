import IFileInfo from '@/interfaces/files/IFileInfo';
import IDivision from '@/interfaces/IDivision';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IDoctorDivision from '@/interfaces/IDoctorDivision';
import IDoctorPaidService from '@/interfaces/IDoctorPaidService';
import IEmployee from '@/interfaces/IEmployee';
import IHuman from '@/interfaces/IHuman';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import IPosition from '@/interfaces/IPosition';
import INewsDoctor from '@/interfaces/news/INewsDoctor';
import ITimetable from '@/interfaces/timetables/ITimetable';

import IEducationalOrganizationAcademic from './IEducationalOrganizationAcademic';

export default interface IDoctor {
  id?: string;
  employee: IEmployee;
  employeeId?: string;
  description: string;
  mosDoctorLink?: string;
  onlineDoctorId?: string;
  show: boolean;
  timetable: ITimetable;
  timetableId?: string;
  position: IPosition;
  positionId?: string;
  tags?: string;
  doctorComments: IDoctorComment[];
  doctorsDivisions: IDoctorDivision[];
  doctorsDivisionsForDelete: string[];
  timetableDaysForDelete: string[];
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  doctorPaidServices: IDoctorPaidService[];
  doctorPaidServicesForDelete: string[];
  educationalOrganizationAcademic?: IEducationalOrganizationAcademic;
  newsDoctors: INewsDoctor[];
  addDoctorPaidService: () => void;
  removeDoctorPaidService: (index: number) => void;

  getFileInfos: () => IFileInfo[];
  getMosDoctorLink: () => string;
  getOnlineDoctorLink: () => string;
  setAcademic: () => void;

  isChief: () => boolean;
  hasAppointment: boolean;
  addDoctorDivision: (division: IDivision) => void;
  getHuman: () => IHuman;

  setEmployee: (employee: IEmployee) => void;
  resetEmployee: () => void;
}

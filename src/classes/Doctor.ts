import Division from '@/classes/Division';
import DoctorDivision from '@/classes/DoctorDivision';
import DoctorPaidService from '@/classes/DoctorPaidService';
import Employee from '@/classes/Employee';
import MedicalProfile from '@/classes/MedicalProfile';
import NewsDoctor from '@/classes/news/NewsDoctor';
import Position from '@/classes/Position';
import Timetable from '@/classes/timetable/Timetable';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDivision from '@/interfaces/IDivision';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IDoctorDivision from '@/interfaces/IDoctorDivision';
import IDoctorPaidService from '@/interfaces/IDoctorPaidService';
import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';
import IHuman from '@/interfaces/IHuman';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import IPosition from '@/interfaces/IPosition';
import INewsDoctor from '@/interfaces/news/INewsDoctor';
import ITimetable from '@/interfaces/timetables/ITimetable';

import DoctorComment from './DoctorComment';
import EducationalOrganizationAcademic from './EducationalOrganizationAcademic';

export default class Doctor implements IDoctor {
  id?: string;
  employee = new Employee();
  employeeId?: string;
  description = '';
  show = true;
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  onlineDoctorId?: string;
  position: IPosition = new Position();
  positionId?: string;
  tags?: string;
  newsDoctors: INewsDoctor[] = [];
  doctorComments: IDoctorComment[] = [];
  doctorPaidServices: IDoctorPaidService[] = [];
  doctorPaidServicesForDelete: string[] = [];
  timetableDaysForDelete: string[] = [];
  doctorsDivisions: IDoctorDivision[] = [];
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  mosDoctorLink?: string;
  educationalOrganizationAcademic?: IEducationalOrganizationAcademic;
  hasAppointment = true;
  doctorsDivisionsForDelete: string[] = [];

  constructor(i?: IDoctor) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.employee = new Employee(i.employee);
    this.employeeId = i.employeeId;
    this.description = i.description;
    this.show = i.show;
    if (i.timetable) {
      this.timetable = new Timetable(i.timetable);
    }
    this.timetableId = i.timetableId;
    this.position = i.position;
    this.tags = i.tags;
    this.mosDoctorLink = i.mosDoctorLink;
    this.medicalProfileId = i.medicalProfileId;
    this.onlineDoctorId = i.onlineDoctorId;

    if (i.medicalProfile) {
      this.medicalProfile = new MedicalProfile(i.medicalProfile);
    }

    if (i.doctorComments) {
      this.doctorComments = i.doctorComments.map((item: IDoctorComment) => new DoctorComment(item));
    }
    this.positionId = i.positionId;
    if (i.position) {
      this.position = new Position(i.position);
    }

    if (i.doctorPaidServices) {
      this.doctorPaidServices = i.doctorPaidServices.map((item: IDoctorPaidService) => new DoctorPaidService(item));
    }
    if (i.doctorsDivisions) {
      this.doctorsDivisions = i.doctorsDivisions.map((item: IDoctorDivision) => new DoctorDivision(item));
    }
    if (i.educationalOrganizationAcademic) {
      this.educationalOrganizationAcademic = new EducationalOrganizationAcademic(i.educationalOrganizationAcademic);
    }
    if (i.newsDoctors) {
      this.newsDoctors = i.newsDoctors.map((item: INewsDoctor) => new NewsDoctor(item));
    }
    this.hasAppointment = i.hasAppointment;
  }

  addDoctorPaidService(): void {
    this.doctorPaidServices.push(new DoctorPaidService());
  }

  removeDoctorPaidService(index: number): void {
    const idForDelete = this.doctorPaidServices[index].id;
    if (idForDelete) {
      this.doctorPaidServicesForDelete.push(idForDelete);
    }
    this.doctorPaidServices.splice(index, 1);
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(...this.employee.getFileInfos());
    return fileInfos;
  }

  getMosDoctorLink(): string {
    return `https://mosgorzdrav.ru/ru-RU/moscowDoctor/default/card/${this.mosDoctorLink}.html`;
  }

  getOnlineDoctorLink(): string {
    return `https://morozdgkb.onlinedoctor.ru/doctors/${this.onlineDoctorId}/`;
  }

  setAcademic(): void {
    const newAcademic = new EducationalOrganizationAcademic();
    if (!this.educationalOrganizationAcademic) {
      newAcademic.doctorId = this.id;
      this.educationalOrganizationAcademic = newAcademic;
    } else {
      this.educationalOrganizationAcademic = undefined;
    }
  }

  isChief(): boolean {
    return false;
  }
  addDoctorDivision(division: IDivision): void {
    const doctorDivision = new DoctorDivision();
    doctorDivision.division = new Division(division);
    doctorDivision.divisionId = division.id;
    this.doctorsDivisions.push(doctorDivision);
  }

  getHuman(): IHuman {
    return this.employee.human;
  }
}

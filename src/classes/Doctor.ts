import Division from '@/classes/Division';
import DoctorDivision from '@/classes/DoctorDivision';
import DoctorPaidService from '@/classes/DoctorPaidService';
import Employee from '@/classes/Employee';
import NewsDoctor from '@/classes/news/NewsDoctor';
import Position from '@/classes/Position';
import Timetable from '@/classes/timetable/Timetable';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IDoctorPaidService from '@/interfaces/IDoctorPaidService';
import IHuman from '@/interfaces/IHuman';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import IPosition from '@/interfaces/IPosition';
import INewsDoctor from '@/interfaces/news/INewsDoctor';
import ITimetable from '@/interfaces/timetables/ITimetable';
import ClassHelper from '@/services/ClassHelper';

import DoctorComment from './DoctorComment';

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
  @ClassHelper.GetClassConstructor(NewsDoctor)
  newsDoctors: INewsDoctor[] = [];
  @ClassHelper.GetClassConstructor(DoctorComment)
  doctorComments: IDoctorComment[] = [];
  @ClassHelper.GetClassConstructor(DoctorPaidService)
  doctorPaidServices: IDoctorPaidService[] = [];
  doctorPaidServicesForDelete: string[] = [];
  timetableDaysForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(DoctorDivision)
  doctorsDivisions: DoctorDivision[] = [];
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  mosDoctorLink?: string;
  hasAppointment = true;
  doctorsDivisionsForDelete: string[] = [];

  constructor(i?: IDoctor) {
    ClassHelper.BuildClass(this, i);
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

  isChief(): boolean {
    return false;
  }
  addDoctorDivision(division: Division): void {
    const doctorDivision = new DoctorDivision();
    doctorDivision.division = new Division(division);
    doctorDivision.divisionId = division.id;
    this.doctorsDivisions.push(doctorDivision);
  }

  setEmployee(employee: Employee): void {
    this.employee = new Employee(employee);
    this.employeeId = employee.id;
  }

  resetEmployee(): void {
    this.employee = new Employee();
    this.employeeId = undefined;
  }

  getHuman(): IHuman {
    return this.employee.human;
  }
}

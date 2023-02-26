import Division from '@/classes/Division';
import DoctorDivision from '@/classes/DoctorDivision';
import DoctorPaidService from '@/classes/DoctorPaidService';
import Employee from '@/classes/Employee';
import NewsDoctor from '@/classes/news/NewsDoctor';
import Position from '@/classes/Position';
import Timetable from '@/classes/timetable/Timetable';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import INewsDoctor from '@/interfaces/news/INewsDoctor';
import ITimetable from '@/interfaces/timetables/ITimetable';
import Human from '@/services/classes/Human';
import ClassHelper from '@/services/ClassHelper';

import DoctorComment from './DoctorComment';

export default class Doctor {
  id?: string;
  employee = new Employee();
  employeeId?: string;
  description = '';
  show = true;
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  onlineDoctorId?: string;
  @ClassHelper.GetClassConstructor(Position)
  position?: Position;
  positionId?: string;
  tags?: string;
  @ClassHelper.GetClassConstructor(NewsDoctor)
  newsDoctors: INewsDoctor[] = [];
  @ClassHelper.GetClassConstructor(DoctorComment)
  doctorComments: DoctorComment[] = [];
  @ClassHelper.GetClassConstructor(DoctorPaidService)
  doctorPaidServices: DoctorPaidService[] = [];
  doctorPaidServicesForDelete: string[] = [];
  timetableDaysForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(DoctorDivision)
  doctorsDivisions: DoctorDivision[] = [];
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  mosDoctorLink?: string;
  hasAppointment = true;
  doctorsDivisionsForDelete: string[] = [];

  constructor(i?: Doctor) {
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

  getHuman(): Human {
    return this.employee.human;
  }

  static GetClassName(): string {
    return 'Doctor';
  }

  setPosition(id: string, name: string): void {
    this.positionId = id;
    this.position = new Position();
    this.position.name = name;
    console.log(this.positionId);
  }

  resetPosition(): void {
    this.positionId = undefined;
    this.position = undefined;
  }
}

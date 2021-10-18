import Division from '@/classes/buildings/Division';
import DoctorRegalia from '@/classes/doctors/DoctorRegalia';
import Education from '@/classes/educations/Education';
import FileInfo from '@/classes/File/FileInfo';
import Human from '@/classes/Human';
import Timetable from '@/classes/timetable/Timetable';
import IDivision from '@/interfaces/buildings/IDivision';
import IDoctor from '@/interfaces/doctors/IDoctor';
import IDoctorComment from '@/interfaces/doctors/IDoctorComment';
import IDoctorRegalia from '@/interfaces/doctors/IDoctorRegalia';
import IEducation from '@/interfaces/education/IEducation';
import ITimetable from '@/interfaces/timetables/ITimetable';

import DoctorComment from './DoctorComment';

export default class Doctor implements IDoctor {
  id?: string;
  human = new Human();
  humanId?: string;
  division?: IDivision;
  divisionId?: string;
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  position?: string;
  tags?: string;
  fileInfo = new FileInfo();
  fileInfoId?: string;
  doctorComments: IDoctorComment[] = [];
  academicDegree = '';
  academicRank = '';
  doctorRegalias: IDoctorRegalia[] = [];
  doctorRegaliasForDelete: string[] = [];
  educations: IEducation[] = [];
  educationsForDelete: string[] = [];

  constructor(doctor?: IDoctor) {
    if (!doctor) {
      return;
    }
    this.id = doctor.id;
    this.human = new Human(doctor.human);
    this.humanId = doctor.humanId;
    this.division = new Division(doctor.division);
    // TODO Исправить)
    if (doctor.divisionId !== '00000000-0000-0000-0000-000000000000') this.divisionId = doctor.divisionId;
    if (doctor.timetable) {
      this.timetable = new Timetable(doctor.timetable);
    }
    this.timetableId = doctor.timetableId;
    this.position = doctor.position;
    this.tags = doctor.tags;
    this.fileInfoId = doctor.fileInfoId;
    if (doctor.fileInfo) {
      this.fileInfo = new FileInfo(doctor.fileInfo);
    }
    if (doctor.doctorComments) {
      this.doctorComments = doctor.doctorComments.map((item: IDoctorComment) => new DoctorComment(item));
    }
    this.academicDegree = doctor.academicDegree;
    this.academicRank = doctor.academicRank;
    if (doctor.doctorRegalias) {
      this.doctorRegalias = doctor.doctorRegalias.map((item: IDoctorRegalia) => new DoctorRegalia(item));
    }
    if (doctor.educations) {
      this.educations = doctor.educations.map((item: IEducation) => new Education(item));
    }
  }
}

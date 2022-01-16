import Division from '@/classes/buildings/Division';
import Certificate from '@/classes/Certificate';
import Education from '@/classes/educations/Education';
import Experience from '@/classes/Experience';
import FileInfo from '@/classes/File/FileInfo';
import Human from '@/classes/Human';
import Regalia from '@/classes/Regalia';
import Timetable from '@/classes/timetable/Timetable';
import IDivision from '@/interfaces/buildings/IDivision';
import IEducation from '@/interfaces/education/IEducation';
import ICertificate from '@/interfaces/ICertificate';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IExperience from '@/interfaces/IExperience';
import IRegalia from '@/interfaces/IRegalia';
import ITimetable from '@/interfaces/timetables/ITimetable';

import DoctorComment from './DoctorComment';

export default class Doctor implements IDoctor {
  id?: string;
  human = new Human();
  humanId?: string;
  division?: IDivision;
  divisionId?: string;
  show = false;
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  position?: string;
  tags?: string;
  fileInfo = new FileInfo();
  fileInfoId?: string;
  doctorComments: IDoctorComment[] = [];
  academicDegree = '';
  academicRank = '';
  regalias: IRegalia[] = [];
  regaliasForDelete: string[] = [];
  educations: IEducation[] = [];
  educationsForDelete: string[] = [];
  timetableDaysForDelete: string[] = [];
  certificates: ICertificate[] = [];
  certificatesForDelete: string[] = [];
  experiences: IExperience[] = [];
  experiencesForDelete: string[] = [];

  constructor(i?: IDoctor) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.human = new Human(i.human);
    this.humanId = i.humanId;
    this.division = new Division(i.division);
    this.show = i.show;
    this.divisionId = i.divisionId;
    if (i.timetable) {
      this.timetable = new Timetable(i.timetable);
    }
    this.timetableId = i.timetableId;
    this.position = i.position;
    this.tags = i.tags;
    this.fileInfoId = i.fileInfoId;
    if (i.fileInfo) {
      this.fileInfo = new FileInfo(i.fileInfo);
    }
    if (i.doctorComments) {
      this.doctorComments = i.doctorComments.map((item: IDoctorComment) => new DoctorComment(item));
    }
    this.academicDegree = i.academicDegree;
    this.academicRank = i.academicRank;
    if (i.regalias) {
      this.regalias = i.regalias.map((item: IRegalia) => new Regalia(item));
    }
    if (i.educations) {
      this.educations = i.educations.map((item: IEducation) => new Education(item));
    }
    if (i.certificates) {
      this.certificates = i.certificates.map((item: ICertificate) => new Certificate(item));
    }
    if (i.experiences) {
      this.experiences = i.experiences.map((item: IExperience) => new Experience(item));
    }
  }
}

import Division from '@/classes/buildings/Division';
import Certificate from '@/classes/Certificate';
import DoctorPaidService from '@/classes/DoctorPaidService';
import Education from '@/classes/educations/Education';
import Experience from '@/classes/Experience';
import FileInfo from '@/classes/File/FileInfo';
import Human from '@/classes/Human';
import MedicalProfile from '@/classes/MedicalProfile';
import Regalia from '@/classes/Regalia';
import Timetable from '@/classes/timetable/Timetable';
import IDivision from '@/interfaces/buildings/IDivision';
import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IDoctorPaidService from '@/interfaces/IDoctorPaidService';
import IExperience from '@/interfaces/IExperience';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
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
  doctorPaidServices: IDoctorPaidService[] = [];
  educations: IEducation[] = [];
  educationsForDelete: string[] = [];
  timetableDaysForDelete: string[] = [];
  certificates: ICertificate[] = [];
  certificatesForDelete: string[] = [];
  experiences: IExperience[] = [];
  experiencesForDelete: string[] = [];
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
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
    this.medicalProfileId = i.medicalProfileId;
    if (i.medicalProfile) {
      this.medicalProfile = new MedicalProfile(i.medicalProfile);
    }

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
    if (i.doctorPaidServices) {
      this.doctorPaidServices = i.doctorPaidServices.map((item: IDoctorPaidService) => new DoctorPaidService(item));
    }
  }

  addExperience(): void {
    this.experiences.push(new Experience());
  }

  removeExperience(index: number): void {
    const idForDelete = this.experiences[index].id;
    if (idForDelete) {
      this.experiencesForDelete.push(idForDelete);
    }
    this.experiences.splice(index, 1);
  }

  addCertificate(): void {
    this.certificates.push(new Certificate());
  }

  removeCertificate(index: number): void {
    const idForDelete = this.certificates[index].id;
    if (idForDelete) {
      this.certificatesForDelete.push(idForDelete);
    }
    this.certificates.splice(index, 1);
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.certificates.forEach((i: ICertificate) => {
      if (i.scan) {
        fileInfos.push(i.scan);
      }
    });
    fileInfos.push(this.fileInfo);
    return fileInfos;
  }
}

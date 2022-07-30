import Division from '@/classes/buildings/Division';
import Certificate from '@/classes/Certificate';
import DoctorPaidService from '@/classes/DoctorPaidService';
import Education from '@/classes/educations/Education';
import Experience from '@/classes/Experience';
import FileInfo from '@/classes/File/FileInfo';
import Human from '@/classes/Human';
import MedicalProfile from '@/classes/MedicalProfile';
import NewsDoctor from '@/classes/news/NewsDoctor';
import Position from '@/classes/Position';
import Regalia from '@/classes/Regalia';
import Timetable from '@/classes/timetable/Timetable';
import IDivision from '@/interfaces/buildings/IDivision';
import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';
import IDoctor from '@/interfaces/IDoctor';
import IDoctorComment from '@/interfaces/IDoctorComment';
import IDoctorPaidService from '@/interfaces/IDoctorPaidService';
import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';
import IExperience from '@/interfaces/IExperience';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import IPosition from '@/interfaces/IPosition';
import IRegalia from '@/interfaces/IRegalia';
import INewsDoctor from '@/interfaces/news/INewsDoctor';
import ITimetable from '@/interfaces/timetables/ITimetable';

import DoctorComment from './DoctorComment';
import EducationalOrganizationAcademic from './EducationalOrganizationAcademic';

export default class Doctor implements IDoctor {
  id?: string;
  human = new Human();
  humanId?: string;
  division?: IDivision;
  divisionId?: string;
  show = true;
  timetable: ITimetable = new Timetable();
  timetableId?: string;
  onlineDoctorId?: string;
  position: IPosition = new Position();
  positionId?: string;
  tags?: string;
  fileInfo = new FileInfo();
  fileInfoId?: string;
  photoMini = new FileInfo();
  photoMiniId?: string;
  newsDoctors: INewsDoctor[] = [];
  doctorComments: IDoctorComment[] = [];
  academicDegree = '';
  academicRank = '';
  regalias: IRegalia[] = [];
  regaliasForDelete: string[] = [];
  doctorPaidServices: IDoctorPaidService[] = [];
  doctorPaidServicesForDelete: string[] = [];
  educations: IEducation[] = [];
  educationsForDelete: string[] = [];
  timetableDaysForDelete: string[] = [];
  certificates: ICertificate[] = [];
  certificatesForDelete: string[] = [];
  experiences: IExperience[] = [];
  experiencesForDelete: string[] = [];
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  mosDoctorLink?: string;
  educationalOrganizationAcademic?: IEducationalOrganizationAcademic;

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
    this.photoMiniId = i.photoMiniId;
    this.mosDoctorLink = i.mosDoctorLink;
    this.medicalProfileId = i.medicalProfileId;
    this.onlineDoctorId = i.onlineDoctorId;
    if (i.medicalProfile) {
      this.medicalProfile = new MedicalProfile(i.medicalProfile);
    }

    if (i.fileInfo) {
      this.fileInfo = new FileInfo(i.fileInfo);
    }
    if (i.photoMini) {
      this.photoMini = new FileInfo(i.photoMini);
    }
    if (i.doctorComments) {
      this.doctorComments = i.doctorComments.map((item: IDoctorComment) => new DoctorComment(item));
    }
    this.academicDegree = i.academicDegree;
    this.academicRank = i.academicRank;
    if (i.regalias) {
      this.regalias = i.regalias.map((item: IRegalia) => new Regalia(item));
    }
    this.positionId = i.positionId;
    if (i.position) {
      this.position = new Position(i.position);
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
    if (i.educationalOrganizationAcademic) {
      this.educationalOrganizationAcademic = new EducationalOrganizationAcademic(i.educationalOrganizationAcademic);
    }
    if (i.newsDoctors) {
      this.newsDoctors = i.newsDoctors.map((item: INewsDoctor) => new NewsDoctor(item));
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
    this.certificates.forEach((i: ICertificate) => {
      if (i.scan) {
        fileInfos.push(i.scan);
      }
    });
    fileInfos.push(...this.human.getFileInfos());

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

  removeFileInfo(): void {
    this.fileInfo = new FileInfo();
    this.fileInfoId = undefined;
  }
  removePhotoMini(): void {
    this.photoMini = new FileInfo();
    this.photoMiniId = undefined;
  }
}

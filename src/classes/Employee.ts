import Certificate from '@/classes/Certificate';
import Education from '@/classes/educations/Education';
import Experience from '@/classes/Experience';
import Human from '@/classes/Human';
import Regalia from '@/classes/Regalia';
import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';
import IEmployee from '@/interfaces/IEmployee';
import IExperience from '@/interfaces/IExperience';
import IHuman from '@/interfaces/IHuman';
import IRegalia from '@/interfaces/IRegalia';

export default class Employee implements IEmployee {
  id?: string;
  human = new Human();
  humanId?: string;
  academicDegree = '';
  academicRank = '';
  regalias: IRegalia[] = [];
  regaliasForDelete: string[] = [];
  educations: IEducation[] = [];
  educationsForDelete: string[] = [];
  certificates: ICertificate[] = [];
  certificatesForDelete: string[] = [];
  experiences: IExperience[] = [];
  experiencesForDelete: string[] = [];

  constructor(i?: IEmployee) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.human = new Human(i.human);
    this.humanId = i.humanId;
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
    fileInfos.push(...this.human.getFileInfos());

    return fileInfos;
  }

  addRegalia() {
    this.regalias.push(new Regalia());
  }

  removeRegalia(i: number) {
    const idForDelete = this.regalias[i].id;
    if (idForDelete) {
      this.regaliasForDelete.push(idForDelete);
    }
    this.regalias.splice(i);
  }

  getHuman(): IHuman {
    return this.human;
  }
}

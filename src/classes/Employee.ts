import Certificate from '@/classes/Certificate';
import Education from '@/classes/educations/Education';
import Experience from '@/classes/Experience';
import Human from '@/classes/Human';
import Regalia from '@/classes/Regalia';
import TeachingActivity from '@/classes/TeachingActivity';
import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';
import IExperience from '@/interfaces/IExperience';
import IHuman from '@/interfaces/IHuman';
import ITeachingActivity from '@/interfaces/ITeachingActivity';
import ClassHelper from '@/services/ClassHelper';

export default class Employee {
  id?: string;
  human = new Human();
  humanId?: string;
  academicDegree = '';
  academicRank = '';
  partTime = false;
  @ClassHelper.GetClassConstructorForArray(Regalia)
  regalias: Regalia[] = [];
  regaliasForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(Education)
  educations: IEducation[] = [];
  educationsForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(Certificate)
  certificates: ICertificate[] = [];
  certificatesForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(Experience)
  experiences: IExperience[] = [];
  experiencesForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(TeachingActivity)
  teachingActivities: ITeachingActivity[] = [];
  teachingActivitiesForDelete: string[] = [];

  //meta
  fullName?: string;
  dateBirth?: string;
  isMale?: string;

  constructor(i?: Employee) {
    ClassHelper.BuildClass(this, i);
  }

  addExperience(): void {
    this.experiences.push(new Experience());
  }

  removeExperience(i: number): void {
    ClassHelper.RemoveFromClassByIndex(i, this.experiences, this.experiencesForDelete);
  }

  addCertificate(): void {
    this.certificates.push(new Certificate());
  }

  removeCertificate(i: number): void {
    ClassHelper.RemoveFromClassByIndex(i, this.certificates, this.certificatesForDelete);
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

  addRegalia(): void {
    this.regalias.push(new Regalia());
  }

  removeRegalia(i: number): void {
    ClassHelper.RemoveFromClassByIndex(i, this.regalias, this.regaliasForDelete);
  }

  addTeachingActivity(): void {
    this.teachingActivities.push(new TeachingActivity());
  }

  removeTeachingActivity(i: number): void {
    ClassHelper.RemoveFromClassByIndex(i, this.teachingActivities, this.teachingActivitiesForDelete);
  }

  getHuman(): IHuman {
    return this.human;
  }
}

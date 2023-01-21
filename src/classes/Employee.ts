import Certificate from '@/classes/Certificate';
import Education from '@/classes/educations/Education';
import Experience from '@/classes/Experience';
import Human from '@/classes/Human';
import Regalia from '@/classes/Regalia';
import TeachingActivity from '@/classes/TeachingActivity';
import IEducation from '@/interfaces/education/IEducation';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';
import IEmployee from '@/interfaces/IEmployee';
import IExperience from '@/interfaces/IExperience';
import IHuman from '@/interfaces/IHuman';
import ITeachingActivity from '@/interfaces/ITeachingActivity';
import ClassBuilder from '@/services/ClassBuilder';
import removeFromClass from '@/services/removeFromClass';

export default class Employee implements IEmployee {
  id?: string;
  human = new Human();
  humanId?: string;
  academicDegree = '';
  academicRank = '';
  @ClassBuilder.GetClassConstructorForArray(Regalia)
  regalias: Regalia[] = [];
  regaliasForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(Education)
  educations: IEducation[] = [];
  educationsForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(Certificate)
  certificates: ICertificate[] = [];
  certificatesForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(Experience)
  experiences: IExperience[] = [];
  experiencesForDelete: string[] = [];
  @ClassBuilder.GetClassConstructorForArray(TeachingActivity)
  teachingActivities: ITeachingActivity[] = [];
  teachingActivitiesForDelete: string[] = [];

  constructor(i?: IEmployee) {
    ClassBuilder.BuildPrimitives(this, i);
  }

  addExperience(): void {
    this.experiences.push(new Experience());
  }

  removeExperience(i: number): void {
    removeFromClass(i, this.experiences, this.experiencesForDelete);
  }

  addCertificate(): void {
    this.certificates.push(new Certificate());
  }

  removeCertificate(i: number): void {
    removeFromClass(i, this.certificates, this.certificatesForDelete);
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
    removeFromClass(i, this.regalias, this.regaliasForDelete);
  }

  addTeachingActivity(): void {
    this.teachingActivities.push(new TeachingActivity());
  }

  removeTeachingActivity(i: number): void {
    removeFromClass(i, this.teachingActivities, this.teachingActivitiesForDelete);
  }

  getHuman(): IHuman {
    return this.human;
  }
}

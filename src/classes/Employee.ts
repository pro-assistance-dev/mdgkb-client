import Accreditation from '@/classes/accreditations/Accreditation';
import Certificate from '@/classes/Certificate';
import Certification from '@/classes/educations/Certification';
import Education from '@/classes/educations/Education';
import Experience from '@/classes/Experience';
import Head from '@/classes/Head';
import Human from '@/classes/Human';
import Regalia from '@/classes/Regalia';
import TeachingActivity from '@/classes/TeachingActivity';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';
import IExperience from '@/interfaces/IExperience';
import IHuman from '@/interfaces/IHuman';
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
  educations: Education[] = [];
  educationsForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(Certificate)
  certificates: ICertificate[] = [];
  certificatesForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(Experience)
  experiences: IExperience[] = [];
  experiencesForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(TeachingActivity)
  teachingActivities: TeachingActivity[] = [];
  teachingActivitiesForDelete: string[] = [];

  @ClassHelper.GetClassConstructorForArray(Certification)
  certifications: Certification[] = [];
  certificationsForDelete: string[] = [];

  @ClassHelper.GetClassConstructorForArray(Accreditation)
  accreditations: Accreditation[] = [];
  accreditaionsForDelete: string[] = [];

  //meta
  fullName?: string;
  dateBirth?: string;
  isMale?: string;
  @ClassHelper.GetClassConstructorForArray(Head)
  head?: Head;
  // headId?: string;

  constructor(i?: Employee) {
    ClassHelper.BuildClass(this, i);
  }

  addExperience(): void {
    this.experiences.push(new Experience());
  }

  addCertification(): void {
    this.certifications.push(new Certification());
  }

  addAccreditation(): void {
    this.accreditations.push(new Accreditation());
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

  addEducation() {
    this.educations.push(new Education());
  }

  getAcademicDegreeAndRank(): string {
    return `${this.academicDegree}${this.academicDegree && this.academicRank ? ' • ' : ''}${this.academicRank}`;
    // return `Кандидат медицинских наук • Заместитель председателя Ученого Совета`;
  }
}

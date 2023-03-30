import 'reflect-metadata';

import Accreditation from '@/classes/Accreditation';
import Certificate from '@/classes/Certificate';
import Certification from '@/classes/Certification';
import Doctor from '@/classes/Doctor';
import Education from '@/classes/Education';
import EducationalAcademic from '@/classes/EducationalAcademic';
import Experience from '@/classes/Experience';
import Head from '@/classes/Head';
import Regalia from '@/classes/Regalia';
import TeachingActivity from '@/classes/TeachingActivity';
import IFileInfo from '@/interfaces/files/IFileInfo';
import Human from '@/services/classes/Human';
import ClassHelper from '@/services/ClassHelper';

export default class Employee {
  id?: string;
  human = new Human();
  humanId?: string;

  academicDegree = '';
  academicRank = '';
  partTime = false;
  @ClassHelper.GetClassConstructor(Regalia)
  regalias: Regalia[] = [];
  regaliasForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(Education)
  educations: Education[] = [];
  educationsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(Certificate)
  certificates: Certificate[] = [];
  certificatesForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(Experience)
  experiences: Experience[] = [];
  experiencesForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(TeachingActivity)
  teachingActivities: TeachingActivity[] = [];
  teachingActivitiesForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(Certification)
  certifications: Certification[] = [];
  certificationsForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(Accreditation)
  accreditations: Accreditation[] = [];
  accreditaionsForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(Head)
  head?: Head;
  headsForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(Doctor)
  doctor?: Doctor;
  doctorsForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(EducationalAcademic)
  educationalAcademic?: EducationalAcademic;
  educationalAcademicsForDelete: string[] = [];

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
    this.certificates.forEach((i: Certificate) => {
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

  getHuman(): Human {
    return this.human;
  }

  addEducation() {
    this.educations.push(new Education());
  }

  getAcademicDegreeAndRank(): string {
    return `${this.academicDegree}${this.academicDegree && this.academicRank ? ' • ' : ''}${this.academicRank}`;
    // return `Кандидат медицинских наук • Заместитель председателя Ученого Совета`;
  }

  setHead(): void {
    this.head = new Head();
  }

  resetHead(): void {
    if (this.head?.id) {
      this.headsForDelete?.push(this.head?.id);
    }
    this.head = undefined;
  }

  setDoctor(): void {
    this.doctor = new Doctor();
  }

  resetDoctor(): void {
    if (this.doctor?.id) {
      this.doctorsForDelete?.push(this.doctor?.id);
    }
    this.doctor = undefined;
  }

  setEducationalAcademic(): void {
    this.educationalAcademic = new EducationalAcademic();
  }

  resetEducationalAcademic(): void {
    if (this.educationalAcademic?.id) {
      this.educationalAcademicsForDelete?.push(this.educationalAcademic?.id);
    }
    this.educationalAcademic = undefined;
  }

  static GetClassName(): string {
    return 'Employee';
  }
}

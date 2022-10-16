import EducationYear from '@/classes/EducationYear';
import FileInfo from '@/classes/File/FileInfo';
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCoursePracticePlace from '@/classes/ResidencyCoursePracticePlace';
import ResidencyCourseSpecialization from '@/classes/ResidencyCourseSpecialization';
import ResidencyCourseTeacher from '@/classes/ResidencyCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDoctor from '@/interfaces/IDoctor';
import IEducationYear from '@/interfaces/IEducationYear';
import IForm from '@/interfaces/IForm';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IResidencyCoursePracticePlace from '@/interfaces/IResidencyCoursePracticePlace';
import IResidencyCourseSpecialization from '@/interfaces/IResidencyCourseSpecialization';
import IResidencyCourseTeacher from '@/interfaces/IResidencyCourseTeacher';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';
import removeFromClass from '@/services/removeFromClass';

import Form from './Form';

export default class ResidencyCourse implements IResidencyCourse {
  id?: string;
  slug = '';
  name = '';
  description = '';
  cost = 0;
  freePlaces = 0;
  freeGovernmentPlaces = 0;
  paidPlaces = 0;
  residencyCoursesSpecializations: IResidencyCourseSpecialization[] = [];
  residencyCoursesSpecializationsForDelete: string[] = [];
  residencyCoursesTeachers: IResidencyCourseTeacher[] = [];
  residencyCoursesTeachersForDelete: string[] = [];
  formPattern: IForm = new Form();
  formPatternId?: string;

  program: IFileInfo = new FileInfo();
  programId?: string;

  annotation: IFileInfo = new FileInfo();
  annotationId?: string;

  plan: IFileInfo = new FileInfo();
  planId?: string;

  schedule: IFileInfo = new FileInfo();
  scheduleId?: string;

  startYear: IEducationYear = new EducationYear();
  startYearId?: string;

  endYear: IEducationYear = new EducationYear();
  endYearId?: string;
  residencyApplications: IResidencyApplication[] = [];

  residencyCoursePracticePlaces: IResidencyCoursePracticePlace[] = [];
  residencyCoursePracticePlacesForDelete: string[] = [];
  constructor(i?: IResidencyCourse) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.slug = i.slug;
    this.description = i.description;

    this.freePlaces = i.freePlaces;
    this.freeGovernmentPlaces = i.freeGovernmentPlaces;
    this.cost = i.cost;
    this.paidPlaces = i.paidPlaces;
    if (i.residencyCoursesTeachers) {
      this.residencyCoursesTeachers = i.residencyCoursesTeachers.map((item: IResidencyCourseTeacher) => new ResidencyCourseTeacher(item));
    }
    if (i.residencyCoursesSpecializations) {
      this.residencyCoursesSpecializations = i.residencyCoursesSpecializations.map(
        (item: IResidencyCourseSpecialization) => new ResidencyCourseSpecialization(item)
      );
    }
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }
    this.formPatternId = i.formPatternId;
    this.programId = i.programId;
    if (i.program) {
      this.program = new FileInfo(i.program);
    }
    this.annotationId = i.annotationId;
    if (i.annotation) {
      this.annotation = new FileInfo(i.annotation);
    }
    this.planId = i.planId;
    if (i.plan) {
      this.plan = new FileInfo(i.plan);
    }
    this.scheduleId = i.scheduleId;
    if (i.schedule) {
      this.schedule = new FileInfo(i.schedule);
    }
    this.startYearId = i.startYearId;
    if (i.startYear) {
      this.startYear = new EducationYear(i.startYear);
    }
    this.endYearId = i.endYearId;
    if (i.endYear) {
      this.endYear = new EducationYear(i.endYear);
    }
    if (i.residencyApplications) {
      this.residencyApplications = i.residencyApplications.map((item: IResidencyApplication) => new ResidencyApplication(item));
    }
    if (i.residencyCoursePracticePlaces) {
      this.residencyCoursePracticePlaces = i.residencyCoursePracticePlaces.map(
        (item: IResidencyCoursePracticePlace) => new ResidencyCoursePracticePlace(item)
      );
    }
  }

  addTeacher(teacher: ITeacher): void {
    const residencyCourseTeacher = new ResidencyCourseTeacher();
    residencyCourseTeacher.teacher = new Teacher(teacher);
    residencyCourseTeacher.teacherId = teacher.id;
    this.residencyCoursesTeachers.push(residencyCourseTeacher);
  }

  setMainTeacher(index: number): void {
    if (typeof index !== 'number' || index < 0 || index >= this.residencyCoursesTeachers.length - 1) {
      return;
    }

    this.residencyCoursesTeachers.forEach((courseTeacher: IResidencyCourseTeacher) => (courseTeacher.main = false));
    this.residencyCoursesTeachers[index].main = true;
  }

  getMainTeacher(): ITeacher | undefined {
    const mainDpoCoursesTeacher = this.residencyCoursesTeachers.find((item: IResidencyCourseTeacher) => item.main);
    if (mainDpoCoursesTeacher) {
      return mainDpoCoursesTeacher.teacher;
    }
  }

  addSpecialization(specialization: ISpecialization): void {
    const index = this.residencyCoursesSpecializations.findIndex(
      (i: IResidencyCourseSpecialization) => i.specializationId === specialization.id
    );
    if (index > -1) {
      removeFromClass(index, this.residencyCoursesSpecializations, this.residencyCoursesSpecializationsForDelete);
      return;
    }
    const residencyCourseSpecialization = new ResidencyCourseSpecialization();
    residencyCourseSpecialization.specialization = new Specialization(specialization);
    residencyCourseSpecialization.specializationId = specialization.id;
    this.residencyCoursesSpecializations.push(residencyCourseSpecialization);
  }

  findSpecialization(id: string): boolean {
    const spec = this.residencyCoursesSpecializations.find((i: IResidencyCourseSpecialization) => i.specializationId === id);
    return !!spec;
  }

  setMainSpecialization(index: number): void {
    if (typeof index !== 'number' || index < 0 || index >= this.residencyCoursesSpecializations.length - 1) {
      return;
    }
    this.residencyCoursesSpecializations.forEach((i: IResidencyCourseSpecialization) => (i.main = false));
    this.residencyCoursesSpecializations[index].main = true;
  }

  getMainSpecialization(): ISpecialization {
    const spec = this.residencyCoursesSpecializations.find((s: IResidencyCourseSpecialization) => s.main);
    if (spec) {
      return spec.specialization;
    }
    if (this.residencyCoursesSpecializations.length > 0) {
      return this.residencyCoursesSpecializations[0].specialization;
    }
    return new Specialization();
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    if (this.program) {
      fileInfos.push(this.program);
    }
    if (this.annotation) {
      fileInfos.push(this.annotation);
    }
    if (this.schedule) {
      fileInfos.push(this.schedule);
    }
    if (this.plan) {
      fileInfos.push(this.plan);
    }

    return fileInfos;
  }

  getPeriod(): string {
    return `${this.startYear.year.getFullYear()} - ${this.endYear.year.getFullYear()}`;
  }

  getPaidCompetitionIndex(): number {
    const paidPlaces = this.paidPlaces;
    const applications = this.getPaidApplications().length;
    if (paidPlaces === 0 || applications === 0 || paidPlaces === applications) {
      return 0;
    }
    const res = (applications / paidPlaces).toFixed(2);
    return Number(res);
  }

  getApplicationsByPoint(): IResidencyApplication[] {
    return this.getAcceptedApplications().sort((a: IResidencyApplication, b: IResidencyApplication) => {
      return b.pointsSum() - a.pointsSum();
    });
  }

  getPaidApplicationsByPoint(): IResidencyApplication[] {
    return this.getApplicationsByPoint().filter((a: IResidencyApplication) => a.paid === true);
  }

  getAcceptedApplications(): IResidencyApplication[] {
    return this.residencyApplications.filter((i: IResidencyApplication) => i.formValue.formStatus.isAccepted());
  }

  isThisYear(): boolean {
    return this.startYear.year.getFullYear() === new Date().getFullYear();
  }

  getFreeApplications(): IResidencyApplication[] {
    return this.getAcceptedApplications().filter((a: IResidencyApplication) => !a.paid);
  }

  getPaidApplications(): IResidencyApplication[] {
    return this.getAcceptedApplications().filter((a: IResidencyApplication) => a.paid);
  }

  getFullName(): string {
    return `${this.getMainSpecialization().code} ${this.getMainSpecialization().name}`;
  }

  applicationPassCompetition(placeOfApplication: number): boolean {
    return placeOfApplication <= this.paidPlaces;
  }

  paidAcceptedApplicationsExists(): boolean {
    return this.residencyApplications.some((a) => a.paid && a.formValue.formStatus.isAccepted());
  }

  getDoctors(): IDoctor[] {
    return this.residencyCoursesTeachers.map((item: IResidencyCourseTeacher) => item.teacher.doctor);
  }
}

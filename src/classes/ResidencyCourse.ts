import EducationYear from '@/classes/EducationYear';
import Employee from '@/classes/Employee';
import FileInfo from '@/classes/File/FileInfo';
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCoursePracticePlace from '@/classes/ResidencyCoursePracticePlace';
import ResidencyCourseSpecialization from '@/classes/ResidencyCourseSpecialization';
import ResidencyCourseTeacher from '@/classes/ResidencyCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IEducationYear from '@/interfaces/IEducationYear';
import IForm from '@/interfaces/IForm';
import ISpecialization from '@/interfaces/ISpecialization';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';

export default class ResidencyCourse {
  id?: string;
  slug = '';
  name = '';
  description = '';
  cost = 0;
  freePlaces = 0;
  freeGovernmentPlaces = 0;
  paidPlaces = 0;
  @ClassHelper.GetClassConstructorForArray(ResidencyCourseSpecialization)
  residencyCoursesSpecializations: ResidencyCourseSpecialization[] = [];
  residencyCoursesSpecializationsForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(ResidencyCourseTeacher)
  residencyCoursesTeachers: ResidencyCourseTeacher[] = [];
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
  @ClassHelper.GetClassConstructorForArray(ResidencyApplication)
  residencyApplications: ResidencyApplication[] = [];
  @ClassHelper.GetClassConstructorForArray(ResidencyCoursePracticePlace)
  residencyCoursePracticePlaces: ResidencyCoursePracticePlace[] = [];
  residencyCoursePracticePlacesForDelete: string[] = [];
  constructor(i?: ResidencyCourse) {
    ClassHelper.BuildClass(this, i);
  }

  getTeachers(): Teacher[] {
    return this.residencyCoursesTeachers.map((t: ResidencyCourseTeacher) => t.teacher);
  }

  addTeacher(teacher: Teacher): void {
    const residencyCourseTeacher = new ResidencyCourseTeacher();
    residencyCourseTeacher.teacher = new Teacher(teacher);
    residencyCourseTeacher.teacherId = teacher.id;
    this.residencyCoursesTeachers.push(residencyCourseTeacher);
  }

  setMainTeacher(index: number): void {
    if (typeof index !== 'number' || index < 0 || index >= this.residencyCoursesTeachers.length - 1) {
      return;
    }

    this.residencyCoursesTeachers.forEach((courseTeacher: ResidencyCourseTeacher) => (courseTeacher.main = false));
    this.residencyCoursesTeachers[index].main = true;
  }

  getMainTeacher(): Teacher | undefined {
    const mainDpoCoursesTeacher = this.residencyCoursesTeachers.find((item: ResidencyCourseTeacher) => item.main);
    if (mainDpoCoursesTeacher) {
      return mainDpoCoursesTeacher.teacher;
    }
  }

  addSpecialization(specialization: ISpecialization): void {
    const index = this.residencyCoursesSpecializations.findIndex(
      (i: ResidencyCourseSpecialization) => i.specializationId === specialization.id
    );
    if (index > -1) {
      ClassHelper.RemoveFromClassByIndex(index, this.residencyCoursesSpecializations, this.residencyCoursesSpecializationsForDelete);
      return;
    }
    const residencyCourseSpecialization = new ResidencyCourseSpecialization();
    residencyCourseSpecialization.specialization = new Specialization(specialization);
    residencyCourseSpecialization.specializationId = specialization.id;
    this.residencyCoursesSpecializations.push(residencyCourseSpecialization);
  }

  findSpecialization(id: string): boolean {
    const spec = this.residencyCoursesSpecializations.find((i: ResidencyCourseSpecialization) => i.specializationId === id);
    return !!spec;
  }

  setMainSpecialization(index: number): void {
    if (typeof index !== 'number' || index < 0 || index >= this.residencyCoursesSpecializations.length - 1) {
      return;
    }
    this.residencyCoursesSpecializations.forEach((i: ResidencyCourseSpecialization) => (i.main = false));
    this.residencyCoursesSpecializations[index].main = true;
  }

  getMainSpecialization(): ISpecialization {
    const spec = this.residencyCoursesSpecializations.find((s: ResidencyCourseSpecialization) => s.main);
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

  getApplicationsByPoint(): ResidencyApplication[] {
    return this.getAcceptedApplications().sort((a: ResidencyApplication, b: ResidencyApplication) => {
      return b.pointsSum() - a.pointsSum();
    });
  }

  getPaidApplicationsByPoint(): ResidencyApplication[] {
    return this.getApplicationsByPoint().filter((a: ResidencyApplication) => a.paid === true);
  }

  getAcceptedApplications(): ResidencyApplication[] {
    return this.residencyApplications.filter((i: ResidencyApplication) => i.formValue.formStatus.isAccepted());
  }

  isThisYear(): boolean {
    return this.startYear.year.getFullYear() === new Date().getFullYear();
  }

  getFreeApplications(): ResidencyApplication[] {
    return this.getAcceptedApplications().filter((a: ResidencyApplication) => !a.paid);
  }

  getPaidApplications(): ResidencyApplication[] {
    return this.getAcceptedApplications().filter((a: ResidencyApplication) => a.paid);
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

  getEmployees(): Employee[] {
    return this.residencyCoursesTeachers.map((item: ResidencyCourseTeacher) => item.teacher.employee);
  }

  getInfoFiles(): IFileInfo[] {
    const annotaion = new FileInfo(this.annotation);
    annotaion.originalName = 'Аннотация';
    const plan = new FileInfo(this.plan);
    plan.originalName = 'План обучения';
    const program = new FileInfo(this.program);
    program.originalName = 'Программа';
    const schedule = new FileInfo(this.schedule);
    schedule.originalName = 'Расписание';
    return [annotaion, plan, program, schedule].filter((f: IFileInfo) => f.fileSystemPath);
  }
}

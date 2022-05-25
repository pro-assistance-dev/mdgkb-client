import EducationYear from '@/classes/EducationYear';
import FileInfo from '@/classes/File/FileInfo';
import ResidencyCourseSpecialization from '@/classes/ResidencyCourseSpecialization';
import ResidencyCourseTeacher from '@/classes/ResidencyCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IEducationYear from '@/interfaces/IEducationYear';
import IForm from '@/interfaces/IForm';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IResidencyCourseSpecialization from '@/interfaces/IResidencyCourseSpecialization';
import IResidencyCourseTeacher from '@/interfaces/IResidencyCourseTeacher';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';
import removeFromClass from '@/mixins/removeFromClass';

import Form from './Form';

export default class ResidencyCourse implements IResidencyCourse {
  id?: string;
  slug = '';
  name = '';
  description = '';
  listeners = 0;
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
  }

  addTeacher(teacher: ITeacher): void {
    const residencyCourseTeacher = new ResidencyCourseTeacher();
    residencyCourseTeacher.teacher = new Teacher(teacher);
    residencyCourseTeacher.teacherId = teacher.id;
    this.residencyCoursesTeachers.push(residencyCourseTeacher);
  }

  setMainTeacher(index: number): void {
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
}

import DpoCourseDates from '@/classes/DpoCourseDates';
import DpoCourseSpecialization from '@/classes/DpoCourseSpecialization';
import DpoCourseTeacher from '@/classes/DpoCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IDpoCourseDates from '@/interfaces/IDpoCourseDates';
import IDpoCourseSpecialization from '@/interfaces/IDpoCourseSpecialization';
import IDpoCourseTeacher from '@/interfaces/IDpoCourseTeacher';
import IForm from '@/interfaces/IForm';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';
import ClassHelper from '@/services/ClassHelper';
import DateTimeFormatter from '@/services/DateFormat';

import Form from './Form';

export default class DpoCourse implements IDpoCourse {
  id?: string;
  slug = '';
  name = '';
  description = '';
  hours = 0;
  isNmo = false;
  isEditMode = false;
  linkNmo = '';
  listeners = 0;
  cost = 0;
  order = 0;

  specialization: ISpecialization = new Specialization();
  specializationId?: string;

  dpoCoursesSpecializations: IDpoCourseSpecialization[] = [];
  dpoCoursesSpecializationsForDelete: string[] = [];
  dpoCoursesTeachers: IDpoCourseTeacher[] = [];
  dpoCoursesTeachersForDelete: string[] = [];
  dpoCoursesDates: IDpoCourseDates[] = [];
  dpoCoursesDatesForDelete: string[] = [];
  formPattern: IForm = new Form();
  formPatternId?: string;

  constructor(i?: IDpoCourse) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.slug = i.slug;
    this.description = i.description;
    this.hours = i.hours;
    this.cost = i.cost;
    this.isNmo = i.isNmo;
    if (i.isEditMode !== undefined) {
      this.isEditMode = i.isEditMode;
    }
    this.linkNmo = i.linkNmo;
    this.listeners = i.listeners;
    this.order = i.order;
    this.formPatternId = i.formPatternId;
    if (i.dpoCoursesDates) {
      this.dpoCoursesDates = i.dpoCoursesDates.map((item: IDpoCourseDates) => new DpoCourseDates(item));
    }
    if (i.dpoCoursesTeachers) {
      this.dpoCoursesTeachers = i.dpoCoursesTeachers.map((item: IDpoCourseTeacher) => new DpoCourseTeacher(item));
    }
    if (i.dpoCoursesSpecializations) {
      this.dpoCoursesSpecializations = i.dpoCoursesSpecializations.map(
        (item: IDpoCourseSpecialization) => new DpoCourseSpecialization(item)
      );
    }
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }

    if (i.specialization) {
      this.specialization = new Specialization(i.specialization);
    }
    this.specializationId = i.specializationId;
  }

  addTeacher(teacher: ITeacher): void {
    const dpoCourseTeacher = new DpoCourseTeacher();
    dpoCourseTeacher.teacher = new Teacher(teacher);
    dpoCourseTeacher.teacherId = teacher.id;
    this.dpoCoursesTeachers.push(dpoCourseTeacher);
  }

  setMainTeacher(index: number): void {
    this.dpoCoursesTeachers.forEach((courseTeacher: IDpoCourseTeacher) => (courseTeacher.main = false));
    this.dpoCoursesTeachers[index].main = true;
  }

  getMainTeacher(): ITeacher | undefined {
    const mainDpoCoursesTeacher = this.dpoCoursesTeachers.find((item: IDpoCourseTeacher) => item.main);
    if (mainDpoCoursesTeacher) {
      return mainDpoCoursesTeacher.teacher;
    }
  }

  addDates(): void {
    this.dpoCoursesDates.push(new DpoCourseDates());
  }

  addSpecialization(specialization: ISpecialization): void {
    const index = this.dpoCoursesSpecializations.findIndex((i: IDpoCourseSpecialization) => i.specializationId === specialization.id);
    if (index > -1) {
      ClassHelper.RemoveFromClassByIndex(index, this.dpoCoursesSpecializations, this.dpoCoursesSpecializationsForDelete);
      return;
    }
    const dpoCourseSpecialization = new DpoCourseSpecialization();
    dpoCourseSpecialization.specialization = new Specialization(specialization);
    dpoCourseSpecialization.specializationId = specialization.id;
    this.dpoCoursesSpecializations.push(dpoCourseSpecialization);
  }
  findSpecialization(id: string): boolean {
    const spec = this.dpoCoursesSpecializations.find((i: IDpoCourseSpecialization) => i.specializationId === id);
    return !!spec;
  }

  getClosestPeriod(): string {
    if (!this.dpoCoursesDates[0]) {
      return 'Даты неизвестны';
    }
    return new DateTimeFormatter().getPeriod(this.dpoCoursesDates[0].start, this.dpoCoursesDates[0].end, { year: '2-digit' });
  }
}

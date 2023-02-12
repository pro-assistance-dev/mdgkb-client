import DpoCourseDates from '@/classes/DpoCourseDates';
import DpoCourseSpecialization from '@/classes/DpoCourseSpecialization';
import DpoCourseTeacher from '@/classes/DpoCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import ISpecialization from '@/interfaces/ISpecialization';
import ClassHelper from '@/services/ClassHelper';
import DateTimeFormatter from '@/services/DateFormat';

import Form from './Form';

export default class DpoCourse {
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

  specialization: Specialization = new Specialization();
  specializationId?: string;

  @ClassHelper.GetClassConstructorForArray(DpoCourseSpecialization)
  dpoCoursesSpecializations: DpoCourseSpecialization[] = [];
  dpoCoursesSpecializationsForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(DpoCourseTeacher)
  dpoCoursesTeachers: DpoCourseTeacher[] = [];
  dpoCoursesTeachersForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(DpoCourseDates)
  dpoCoursesDates: DpoCourseDates[] = [];
  dpoCoursesDatesForDelete: string[] = [];
  formPattern: Form = new Form();
  formPatternId?: string;

  constructor(i?: DpoCourse) {
    ClassHelper.BuildClass(this, i);
  }

  addTeacher(teacher: Teacher): void {
    const dpoCourseTeacher = new DpoCourseTeacher();
    dpoCourseTeacher.teacher = new Teacher(teacher);
    dpoCourseTeacher.teacherId = teacher.id;
    this.dpoCoursesTeachers.push(dpoCourseTeacher);
  }

  setMainTeacher(index: number): void {
    this.dpoCoursesTeachers.forEach((courseTeacher: DpoCourseTeacher) => (courseTeacher.main = false));
    this.dpoCoursesTeachers[index].main = true;
  }

  getMainTeacher(): Teacher | undefined {
    const mainDpoCoursesTeacher = this.dpoCoursesTeachers.find((item: DpoCourseTeacher) => item.main);
    if (mainDpoCoursesTeacher) {
      return mainDpoCoursesTeacher.teacher;
    }
  }

  addDates(): void {
    this.dpoCoursesDates.push(new DpoCourseDates());
  }

  addSpecialization(specialization: ISpecialization): void {
    const index = this.dpoCoursesSpecializations.findIndex((i: DpoCourseSpecialization) => i.specializationId === specialization.id);
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
    const spec = this.dpoCoursesSpecializations.find((i: DpoCourseSpecialization) => i.specializationId === id);
    return !!spec;
  }

  getClosestPeriod(): string {
    if (!this.dpoCoursesDates[0]) {
      return 'Даты неизвестны';
    }
    return new DateTimeFormatter().getPeriod(this.dpoCoursesDates[0].start, this.dpoCoursesDates[0].end, { year: '2-digit' });
  }
}

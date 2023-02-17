import DpoCourseDates from '@/classes/DpoCourseDates';
import Employee from '@/classes/Employee';
import NmoCourseSpecialization from '@/classes/NmoCourseSpecialization';
import NmoCourseTeacher from '@/classes/NmoCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import ISpecialization from '@/interfaces/ISpecialization';
import ClassHelper from '@/services/ClassHelper';
import DateTimeFormatter from '@/services/DateFormat';

import Form from './Form';

export default class NmoCourse {
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

  @ClassHelper.GetClassConstructorForArray(NmoCourseSpecialization)
  dpoCoursesSpecializations: NmoCourseSpecialization[] = [];
  dpoCoursesSpecializationsForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(NmoCourseTeacher)
  nmoCourseTeachers: NmoCourseTeacher[] = [];
  nmoCourseTeachersForDelete: string[] = [];
  @ClassHelper.GetClassConstructorForArray(DpoCourseDates)
  dpoCoursesDates: DpoCourseDates[] = [];
  dpoCoursesDatesForDelete: string[] = [];
  formPattern: Form = new Form();
  formPatternId?: string;

  mainTeacher: Employee = new Employee();
  mainTeacherId?: string;

  constructor(i?: NmoCourse) {
    ClassHelper.BuildClass(this, i);
  }

  addTeacher(teacher: Teacher): void {
    const dpoCourseTeacher = new NmoCourseTeacher();
    dpoCourseTeacher.teacher = new Teacher(teacher);
    dpoCourseTeacher.teacherId = teacher.id;
    this.nmoCourseTeachers.push(dpoCourseTeacher);
  }

  setMainTeacher(teacher: Employee): void {
    this.mainTeacher = new Employee(teacher);
    this.mainTeacherId = teacher.id;
  }

  teacherExists(teacherId: string): boolean {
    return !!this.nmoCourseTeachers.find((t: NmoCourseTeacher) => t.teacherId === teacherId);
  }

  addDates(): void {
    this.dpoCoursesDates.push(new DpoCourseDates());
  }

  addSpecialization(specialization: ISpecialization): void {
    const index = this.dpoCoursesSpecializations.findIndex((i: NmoCourseSpecialization) => i.specializationId === specialization.id);
    if (index > -1) {
      ClassHelper.RemoveFromClassByIndex(index, this.dpoCoursesSpecializations, this.dpoCoursesSpecializationsForDelete);
      return;
    }
    const dpoCourseSpecialization = new NmoCourseSpecialization();
    dpoCourseSpecialization.specialization = new Specialization(specialization);
    dpoCourseSpecialization.specializationId = specialization.id;
    this.dpoCoursesSpecializations.push(dpoCourseSpecialization);
  }
  findSpecialization(id: string): boolean {
    const spec = this.dpoCoursesSpecializations.find((i: NmoCourseSpecialization) => i.specializationId === id);
    return !!spec;
  }

  getClosestPeriod(): string {
    if (!this.dpoCoursesDates[0]) {
      return 'Даты неизвестны';
    }
    return new DateTimeFormatter().getPeriod(this.dpoCoursesDates[0].start, this.dpoCoursesDates[0].end, { year: '2-digit' });
  }

  resetMainTeacher(): void {
    this.mainTeacher = new Employee();
    this.mainTeacherId = undefined;
  }
}

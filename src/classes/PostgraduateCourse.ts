import PostgraduateCourseDates from '@/classes/PostgraduateCourseDates';
import PostgraduateCourseSpecialization from '@/classes/PostgraduateCourseSpecialization';
import PostgraduateCourseTeacher from '@/classes/PostgraduateCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import IPostgraduateCourseDates from '@/interfaces/IPostgraduateCourseDates';
import IPostgraduateCourseSpecialization from '@/interfaces/IPostgraduateCourseSpecialization';
import IPostgraduateCourseTeacher from '@/interfaces/IPostgraduateCourseTeacher';
import IForm from '@/interfaces/IForm';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';
import removeFromClass from '@/mixins/removeFromClass';
import fillDateFormat from '@/services/DateFormat';

import Form from './Form';

export default class PostgraduateCourse implements IPostgraduateCourse {
  id?: string;
  description = '';
  postgraduateCoursesSpecializations: IPostgraduateCourseSpecialization[] = [];
  postgraduateCoursesSpecializationsForDelete: string[] = [];
  postgraduateCoursesTeachers: IPostgraduateCourseTeacher[] = [];
  postgraduateCoursesTeachersForDelete: string[] = [];
  postgraduateCoursesDates: IPostgraduateCourseDates[] = [];
  postgraduateCoursesDatesForDelete: string[] = [];
  formPattern: IForm = new Form();
  formPatternId?: string;

  constructor(i?: IPostgraduateCourse) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.description = i.description;
    this.formPatternId = i.formPatternId;
    if (i.postgraduateCoursesDates) {
      this.postgraduateCoursesDates = i.postgraduateCoursesDates.map((item: IPostgraduateCourseDates) => new PostgraduateCourseDates(item));
    }
    if (i.postgraduateCoursesTeachers) {
      this.postgraduateCoursesTeachers = i.postgraduateCoursesTeachers.map((item: IPostgraduateCourseTeacher) => new PostgraduateCourseTeacher(item));
    }
    if (i.postgraduateCoursesSpecializations) {
      this.postgraduateCoursesSpecializations = i.postgraduateCoursesSpecializations.map(
        (item: IPostgraduateCourseSpecialization) => new PostgraduateCourseSpecialization(item)
      );
    }
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }
  }

  addTeacher(teacher: ITeacher): void {
    const postgraduateCourseTeacher = new PostgraduateCourseTeacher();
    postgraduateCourseTeacher.teacher = new Teacher(teacher);
    postgraduateCourseTeacher.teacherId = teacher.id;
    this.postgraduateCoursesTeachers.push(postgraduateCourseTeacher);
  }

  setMainTeacher(index: number): void {
    this.postgraduateCoursesTeachers.forEach((courseTeacher: IPostgraduateCourseTeacher) => (courseTeacher.main = false));
    this.postgraduateCoursesTeachers[index].main = true;
  }

  getMainTeacher(): ITeacher | undefined {
    const mainPostgraduateCoursesTeacher = this.postgraduateCoursesTeachers.find((item: IPostgraduateCourseTeacher) => item.main);
    if (mainPostgraduateCoursesTeacher) {
      return mainPostgraduateCoursesTeacher.teacher;
    }
  }

  addDates(): void {
    this.postgraduateCoursesDates.push(new PostgraduateCourseDates());
  }

  addSpecialization(specialization: ISpecialization): void {
    const index = this.postgraduateCoursesSpecializations.findIndex((i: IPostgraduateCourseSpecialization) => i.specializationId === specialization.id);
    if (index > -1) {
      removeFromClass(index, this.postgraduateCoursesSpecializations, this.postgraduateCoursesSpecializationsForDelete);
      return;
    }
    const postgraduateCourseSpecialization = new PostgraduateCourseSpecialization();
    postgraduateCourseSpecialization.specialization = new Specialization(specialization);
    postgraduateCourseSpecialization.specializationId = specialization.id;
    this.postgraduateCoursesSpecializations.push(postgraduateCourseSpecialization);
  }
  findSpecialization(id: string): boolean {
    const spec = this.postgraduateCoursesSpecializations.find((i: IPostgraduateCourseSpecialization) => i.specializationId === id);
    return !!spec;
  }

  getClosestPeriod(): string {
    if (!this.postgraduateCoursesDates[0] || !this.postgraduateCoursesDates[0]) {
      return 'Даты неизвестны';
    }
    const dateStart = fillDateFormat(this.postgraduateCoursesDates[0].start);
    const dateEnd = fillDateFormat(this.postgraduateCoursesDates[0].start);
    return `${dateStart}-${dateEnd}`;
  }
}
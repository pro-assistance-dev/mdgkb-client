import ResidencyCourseSpecialization from '@/classes/ResidencyCourseSpecialization';
import ResidencyCourseTeacher from '@/classes/ResidencyCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
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

  residencyCoursesSpecializations: IResidencyCourseSpecialization[] = [];
  residencyCoursesSpecializationsForDelete: string[] = [];
  residencyCoursesTeachers: IResidencyCourseTeacher[] = [];
  residencyCoursesTeachersForDelete: string[] = [];
  formPattern: IForm = new Form();
  formPatternId?: string;

  constructor(i?: IResidencyCourse) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.slug = i.slug;
    this.description = i.description;

    this.listeners = i.listeners;
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
}

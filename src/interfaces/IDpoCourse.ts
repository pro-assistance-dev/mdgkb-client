import IDpoCourseDates from '@/interfaces/IDpoCourseDates';
import IDpoCourseSpecialization from '@/interfaces/IDpoCourseSpecialization';
import IDpoCourseTeacher from '@/interfaces/IDpoCourseTeacher';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';

import IForm from './IForm';

export default interface IDpoCourse {
  id?: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  cost: number;
  isNmo: boolean;
  linkNmo: string;
  listeners: number;
  hours: number;
  dpoCoursesTeachers: IDpoCourseTeacher[];
  dpoCoursesTeachersForDelete: string[];
  dpoCoursesSpecializations: IDpoCourseSpecialization[];
  dpoCoursesSpecializationsForDelete: string[];
  dpoCoursesDates: IDpoCourseDates[];
  dpoCoursesDatesForDelete: string[];
  formPattern: IForm;
  formPatternId?: string;
  isEditMode: boolean;

  specialization?: ISpecialization;
  specializationId?: string;

  addTeacher: (teacher: ITeacher) => void;
  setMainTeacher: (index: number) => void;
  getMainTeacher: () => ITeacher | undefined;

  addDates: () => void;
  addSpecialization: (specialization: ISpecialization) => void;
  findSpecialization: (id: string) => boolean;
  getClosestPeriod: () => string;
}

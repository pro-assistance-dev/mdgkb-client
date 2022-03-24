import IFileInfo from '@/interfaces/files/IFileInfo';
import IPostgraduateCourseDates from '@/interfaces/IPostgraduateCourseDates';
import IPostgraduateCourseSpecialization from '@/interfaces/IPostgraduateCourseSpecialization';
import IPostgraduateCourseTeacher from '@/interfaces/IPostgraduateCourseTeacher';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';

import IForm from './IForm';

export default interface IPostgraduateCourse {
  id?: string;
  description: string;
  postgraduateCoursesTeachers: IPostgraduateCourseTeacher[];
  postgraduateCoursesTeachersForDelete: string[];
  postgraduateCoursesSpecializations: IPostgraduateCourseSpecialization[];
  postgraduateCoursesSpecializationsForDelete: string[];
  postgraduateCoursesDates: IPostgraduateCourseDates[];
  postgraduateCoursesDatesForDelete: string[];
  questionsFile: IFileInfo;
  questionsFileId?: string;
  formPattern: IForm;
  formPatternId?: string;

  addTeacher: (teacher: ITeacher) => void;
  setMainTeacher: (index: number) => void;
  getMainTeacher: () => ITeacher | undefined;

  addDates: () => void;
  addSpecialization: (specialization: ISpecialization) => void;
  findSpecialization: (id: string) => boolean;
  getClosestPeriod: () => string;
  getFileInfos: () => IFileInfo[];
}

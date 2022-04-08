import IFileInfo from '@/interfaces/files/IFileInfo';
import IEducationYear from '@/interfaces/IEducationYear';
import IResidencyCourseSpecialization from '@/interfaces/IResidencyCourseSpecialization';
import IResidencyCourseTeacher from '@/interfaces/IResidencyCourseTeacher';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';

import IForm from './IForm';

export default interface IResidencyCourse {
  id?: string;
  name: string;
  slug: string;
  description: string;
  freePlaces: number;
  cost: number;

  program: IFileInfo;
  programId?: string;

  annotation: IFileInfo;
  annotationId?: string;

  plan: IFileInfo;
  planId?: string;

  schedule: IFileInfo;
  scheduleId?: string;

  startYear: IEducationYear;
  startYearId?: string;

  endYear: IEducationYear;
  endYearId?: string;

  paidPlaces: number;
  residencyCoursesTeachers: IResidencyCourseTeacher[];
  residencyCoursesTeachersForDelete: string[];
  residencyCoursesSpecializations: IResidencyCourseSpecialization[];
  residencyCoursesSpecializationsForDelete: string[];
  formPattern: IForm;
  formPatternId?: string;

  addTeacher: (teacher: ITeacher) => void;
  setMainTeacher: (index: number) => void;
  getMainTeacher: () => ITeacher | undefined;

  addSpecialization: (specialization: ISpecialization) => void;
  findSpecialization: (id: string) => boolean;
  setMainSpecialization: (index: number) => void;

  getMainSpecialization: () => ISpecialization;
  getFileInfos: () => IFileInfo[];
}

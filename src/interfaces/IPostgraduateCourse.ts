import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPostgraduateCourseDates from '@/interfaces/IPostgraduateCourseDates';
import IPostgraduateCoursePlan from '@/interfaces/IPostgraduateCoursePlan';
import IPostgraduateCourseSpecialization from '@/interfaces/IPostgraduateCourseSpecialization';
import IPostgraduateCourseTeacher from '@/interfaces/IPostgraduateCourseTeacher';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';

import IForm from './IForm';

export default interface IPostgraduateCourse {
  id?: string;
  description: string;
  educationForm: string;
  years: number;
  slug: string;
  postgraduateCoursesTeachers: IPostgraduateCourseTeacher[];
  postgraduateCoursesTeachersForDelete: string[];
  postgraduateCoursesSpecializations: IPostgraduateCourseSpecialization[];
  postgraduateCoursesSpecializationsForDelete: string[];
  postgraduateCoursesDates: IPostgraduateCourseDates[];
  postgraduateCoursesDatesForDelete: string[];

  questionsFile: IFileInfo;
  questionsFileId?: string;

  programFile: IFileInfo;
  programFileId?: string;

  calendar: IFileInfo;
  calendarId?: string;

  postgraduateCoursePlans: IPostgraduateCoursePlan[];
  postgraduateCoursePlansForDelete: string[];

  formPattern: IForm;
  formPatternId?: string;

  addTeacher: (teacher: ITeacher) => void;
  setMainTeacher: (index: number) => void;
  getMainTeacher: () => ITeacher | undefined;

  setMainSpecialization: (index: number) => void;
  getMainSpecialization: () => ISpecialization;
  addDates: () => void;
  addSpecialization: (specialization: ISpecialization) => void;
  findSpecialization: (id: string) => boolean;
  getClosestPeriod: () => string;
  getFileInfos: () => IFileInfo[];

  addPostgraduateCoursePlan: () => void;

  documentTypeId?: string;
  documentType: IDocumentType;
}

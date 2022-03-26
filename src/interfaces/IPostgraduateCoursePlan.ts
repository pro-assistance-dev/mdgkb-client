import IFileInfo from '@/interfaces/files/IFileInfo';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';

export default interface IPostgraduateCoursePlan {
  id?: string;
  year: Date;
  postgraduateCourse: IPostgraduateCourse;
  postgraduateCourseId?: string;
  plan: IFileInfo;
  planId?: string;
}

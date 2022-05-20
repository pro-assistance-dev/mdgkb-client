import IPostgraduateCourse from './IPostgraduateCourse';

export default interface IPostgraduateCourseWithCount {
  postgraduateCourses: IPostgraduateCourse[];
  count: number;
}

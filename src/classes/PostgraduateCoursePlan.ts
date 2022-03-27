import FileInfo from '@/classes/File/FileInfo';
import PostgraduateCourse from '@/classes/PostgraduateCourse';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import IPostgraduateCoursePlan from '@/interfaces/IPostgraduateCoursePlan';

export default class PostgraduateCoursePlan implements IPostgraduateCoursePlan {
  id?: string;
  postgraduateCourse: IPostgraduateCourse = new PostgraduateCourse();
  postgraduateCourseId?: string;
  year: Date = new Date();
  plan: IFileInfo = new FileInfo();
  planId?: string;
  constructor(i?: IPostgraduateCoursePlan) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.postgraduateCourseId = i.postgraduateCourseId;
    this.planId = i.planId;
    this.year = new Date(i.year);
    if (i.postgraduateCourse) {
      this.postgraduateCourse = new PostgraduateCourse(i.postgraduateCourse);
    }
    if (i.plan) {
      this.plan = new FileInfo(i.plan);
    }
  }
}

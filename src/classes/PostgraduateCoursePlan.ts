import FileInfo from '@/classes/File/FileInfo';
import PostgraduateCourse from '@/classes/PostgraduateCourse';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class PostgraduateCoursePlan {
  id?: string;
  postgraduateCourse: PostgraduateCourse = new PostgraduateCourse();
  postgraduateCourseId?: string;
  year: Date = new Date();
  plan: IFileInfo = new FileInfo();
  planId?: string;
  constructor(i?: PostgraduateCoursePlan) {
    ClassHelper.BuildClass(this, i);
  }
}

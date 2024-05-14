import FileInfo from '@/services/classes/FileInfo.ts';
import PostgraduateCourse from '@/classes/PostgraduateCourse';
import ClassHelper from '@/services/ClassHelper';

export default class PostgraduateCoursePlan {
  id?: string;
  postgraduateCourse: PostgraduateCourse = new PostgraduateCourse();
  postgraduateCourseId?: string;
  year: Date = new Date();
  plan: FileInfo = new FileInfo();
  planId?: string;
  constructor(i?: PostgraduateCoursePlan) {
    ClassHelper.BuildClass(this, i);
  }
}

import Form from '@/classes/Form';
import PostgraduateCourse from '@/classes/PostgraduateCourse';
import FileInfo from '@/services/classes/FileInfo.ts';
import ClassHelper from '@/services/ClassHelper';

export default class PostgraduateApplication {
  id?: string;
  postgraduateCourseId?: string;
  @ClassHelper.GetClassConstructor(PostgraduateCourse)
  postgraduateCourse = new PostgraduateCourse();
  formValue = new Form();
  formValueId?: string;
  createdAt = '';
  fullName = '';
  email = '';
  courseName = '';

  constructor(i?: PostgraduateApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): FileInfo[] {
    return this.formValue.getFileInfos();
  }

  static GetClassName(): string {
    return 'postgraduateApplication';
  }
}

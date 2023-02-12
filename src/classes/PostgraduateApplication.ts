import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';
import PostgraduateCourse from './PostgraduateCourse';

export default class PostgraduateApplication implements PostgraduateApplication {
  id?: string;
  postgraduateCourseId?: string;
  postgraduateCourse = new PostgraduateCourse();
  formValue = new Form();
  formValueId?: string;

  constructor(i?: PostgraduateApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }
}

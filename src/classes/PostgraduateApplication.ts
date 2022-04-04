import IFileInfo from '@/interfaces/files/IFileInfo';
import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';

import Form from './Form';
import PostgraduateCourse from './PostgraduateCourse';

export default class PostgraduateApplication implements IPostgraduateApplication {
  id?: string;
  postgraduateCourseId?: string;
  postgraduateCourse = new PostgraduateCourse();
  formValue = new Form();
  formValueId?: string;

  constructor(postgraduateApplication?: IPostgraduateApplication) {
    if (!postgraduateApplication) {
      return;
    }
    this.id = postgraduateApplication.id;
    this.postgraduateCourseId = postgraduateApplication.postgraduateCourseId;
    if (postgraduateApplication.postgraduateCourse) {
      this.postgraduateCourse = new PostgraduateCourse(postgraduateApplication.postgraduateCourse);
    }
    if (postgraduateApplication.formValue) {
      this.formValue = new Form(postgraduateApplication.formValue);
    }
    this.formValueId = postgraduateApplication.formValueId;
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFieldValuesFileInfos();
  }
}

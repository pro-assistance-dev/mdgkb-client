import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';
import NmoCourse from './NmoCourse';

export default class DpoApplication {
  id?: string;
  nmoCourse = new NmoCourse();
  dpoCourseId?: string;
  formValue = new Form();
  formValueId?: string;

  //
  isNmo = false;
  formStatusId = '';
  createdAt = '';
  fullName = '';
  email = '';
  courseName = '';
  constructor(i?: DpoApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }

  static GetClassName(): string {
    return 'dpoApplication';
  }
}

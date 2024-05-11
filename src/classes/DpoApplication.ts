import FileInfo from '@/services/classes/FileInfo.ts';
import Form from '@/classes/Form';
import NmoCourse from '@/classes/NmoCourse';
import ClassHelper from '@/services/ClassHelper';

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

  getFileInfos(): FileInfo[] {
    return this.formValue.getFileInfos();
  }

  static GetClassName(): string {
    return 'dpoApplication';
  }
}

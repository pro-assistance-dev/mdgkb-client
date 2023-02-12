import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

import DpoCourse from './DpoCourse';
import Form from './Form';

export default class DpoApplication {
  id?: string;
  dpoCourse = new DpoCourse();
  dpoCourseId?: string;
  formValue = new Form();
  formValueId?: string;

  constructor(i?: DpoApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }
}

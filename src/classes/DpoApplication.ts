import IFileInfo from '@/interfaces/files/IFileInfo';
import IDpoApplication from '@/interfaces/IDpoApplication';

import DpoCourse from './DpoCourse';
import Form from './Form';

export default class DpoApplication implements IDpoApplication {
  id?: string;
  dpoCourse = new DpoCourse();
  dpoCourseId?: string;
  formValue = new Form();
  formValueId?: string;

  constructor(dpoApplication?: IDpoApplication) {
    if (!dpoApplication) {
      return;
    }
    this.id = dpoApplication.id;
    this.dpoCourseId = dpoApplication.dpoCourseId;
    this.formValueId = dpoApplication.formValueId;
    if (dpoApplication.dpoCourse) {
      this.dpoCourse = new DpoCourse(dpoApplication.dpoCourse);
    }
    if (dpoApplication.formValue) {
      this.formValue = new Form(dpoApplication.formValue);
    }
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFieldValuesFileInfos();
  }
}

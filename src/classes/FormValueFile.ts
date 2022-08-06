import Form from '@/classes/Form';
import IForm from '@/interfaces/IForm';
import IFormValueFile from '@/interfaces/IFormValueFile';

import FileInfo from './File/FileInfo';

export default class FormValueFile implements IFormValueFile {
  id?: string;
  formValueId?: string;
  formValue: IForm = new Form();
  file = new FileInfo();
  fileId?: string;

  constructor(i?: IFormValueFile) {
    if (!i) {
      return;
    }
    this.id = i.id;

    this.formValueId = i.formValueId;
    this.fileId = i.fileId;
    if (i.file) {
      this.file = new FileInfo(i.file);
    }
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    }
  }
}

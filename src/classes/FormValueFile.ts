import Form from '@/classes/Form';
import IForm from '@/interfaces/IForm';
import IFormValueFile from '@/interfaces/IFormValueFile';
import ClassHelper from '@/services/ClassHelper';

import FileInfo from './File/FileInfo';

export default class FormValueFile implements IFormValueFile {
  id?: string;
  formValueId?: string;
  formValue: IForm = new Form();
  file = new FileInfo();
  fileId?: string;

  constructor(i?: IFormValueFile) {
    ClassHelper.BuildClass(this, i);
  }
}

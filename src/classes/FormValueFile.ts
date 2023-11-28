import FileInfo from '@/classes/FileInfo';
import Form from '@/classes/Form';
import ClassHelper from '@/services/ClassHelper';

export default class FormValueFile {
  id?: string;
  formValueId?: string;
  formValue: Form = new Form();
  @ClassHelper.GetClassConstructor(FileInfo)
  file = new FileInfo();
  fileId?: string;

  constructor(i?: FormValueFile) {
    ClassHelper.BuildClass(this, i);
  }
}

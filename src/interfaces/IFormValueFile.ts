import IForm from '@/interfaces/IForm';

import IFileInfo from './files/IFileInfo';

export default interface IFormValueFile {
  id?: string;
  formValueId?: string;
  formValue?: IForm;
  file?: IFileInfo;
  fileId?: string;
}

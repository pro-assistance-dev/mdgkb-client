import IFieldValue from '@/interfaces/IFieldValue';

import IFileInfo from './files/IFileInfo';

export default interface IFieldValueFile {
  id?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo;
  fieldValueId?: string;
  fieldValue?: IFieldValue;
}

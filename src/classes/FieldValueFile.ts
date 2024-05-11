import FieldValue from '@/classes/FieldValue';
import FileInfo from '@/services/classes/FileInfo.ts';
import ClassHelper from '@/services/ClassHelper';

export default class FieldValueFile {
  id?: string;
  fileInfoId?: string;
  fileInfo: FileInfo = new FileInfo();
  fieldValueId?: string;
  fieldValue?: FieldValue;

  constructor(i?: FieldValueFile) {
    ClassHelper.BuildClass(this, i);
  }
}

import FieldValue from '@/classes/FieldValue';
import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFieldValue from '@/interfaces/IFieldValue';
import IFieldValueFile from '@/interfaces/IFieldValueFile';

export default class FieldValueFile implements IFieldValueFile {
  id?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo = new FileInfo();
  fieldValueId?: string;
  fieldValue?: IFieldValue;

  constructor(i?: IFieldValueFile) {
    if (!i) return;
    this.id = i.id;
    this.fileInfoId = i.fileInfoId;
    if (i.fileInfo) {
      this.fileInfo = new FileInfo(i.fileInfo);
    }
    this.fieldValueId = i.fileInfoId;
    if (i.fieldValue) {
      this.fieldValue = new FieldValue(i.fieldValue);
    }
  }
}

import FileInfo from '@/services/classes/FileInfo.ts';
import ClassHelper from '@/services/ClassHelper';

export default class DocumentTypeImage {
  id?: string;
  documentTypeId?: string;
  order = 0;
  fileInfoId?: string;
  fileInfo: FileInfo = new FileInfo();
  description = '';

  constructor(i?: DocumentTypeImage) {
    ClassHelper.BuildClass(this, i);
  }
}

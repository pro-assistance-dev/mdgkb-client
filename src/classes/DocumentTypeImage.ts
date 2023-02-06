import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class DocumentTypeImage {
  id?: string;
  documentTypeId?: string;
  order = 0;
  fileInfoId?: string;
  fileInfo: IFileInfo = new FileInfo();
  description = '';

  constructor(i?: DocumentTypeImage) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.fileInfoId = i.fileInfoId;
    this.documentTypeId = i.documentTypeId;
    this.order = i.order;
    this.description = i.description;
    if (i.fileInfo) {
      this.fileInfo = new FileInfo(i.fileInfo);
    }
  }
}

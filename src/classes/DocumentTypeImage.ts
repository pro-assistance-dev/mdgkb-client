import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentTypeImage from '@/interfaces/IDocumentTypeImage';

export default class DocumentTypeImage implements IDocumentTypeImage {
  id?: string;
  documentTypeId?: string;
  order = 0;
  fileInfoId?: string;
  fileInfo: IFileInfo = new FileInfo();
  description = '';

  constructor(i?: IDocumentTypeImage) {
    if (!i) return;
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

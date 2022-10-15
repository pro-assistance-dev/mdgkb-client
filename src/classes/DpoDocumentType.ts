import DocumentType from '@/classes/document/DocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentType from '@/interfaces/IDocumentType';
import IDpoDocumentType from '@/interfaces/IDpoDocumentType';

export default class DpoDocumentType implements IDpoDocumentType {
  id?: string;
  documentType: IDocumentType = new DocumentType();
  documentTypeId?: string;

  constructor(i?: IDpoDocumentType) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.documentTypeId = i.documentTypeId;
    if (i.documentType) {
      this.documentType = new DocumentType(i.documentType);
    }
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(...this.documentType.getFileInfos());
    return fileInfos;
  }
}

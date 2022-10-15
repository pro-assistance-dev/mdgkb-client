import DocumentType from '@/classes/document/DocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICandidateDocumentType from '@/interfaces/ICandidateDocumentType';
import IDocumentType from '@/interfaces/IDocumentType';

export default class CandidateDocumentType implements ICandidateDocumentType {
  id?: string;
  documentType: IDocumentType = new DocumentType();
  documentTypeId?: string;

  constructor(i?: ICandidateDocumentType) {
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

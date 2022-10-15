import DocumentType from '@/classes/document/DocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IAdmissionCommitteeDocumentType from '@/interfaces/IAdmissionCommitteeDocumentType';
import IDocumentType from '@/interfaces/IDocumentType';

export default class AdmissionCommitteeDocumentType implements IAdmissionCommitteeDocumentType {
  id?: string;
  documentType: IDocumentType = new DocumentType();
  documentTypeId?: string;
  order = 0;
  constructor(i?: IAdmissionCommitteeDocumentType) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.documentTypeId = i.documentTypeId;
    this.order = i.order;
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

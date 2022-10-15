import DocumentType from '@/classes/document/DocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentType from '@/interfaces/IDocumentType';
import IResidencyDocumentType from '@/interfaces/IResidencyDocumentType';

export default class ResidencyDocumentType implements IResidencyDocumentType {
  id?: string;
  documentType: IDocumentType = new DocumentType();
  documentTypeId?: string;

  constructor(i?: IResidencyDocumentType) {
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

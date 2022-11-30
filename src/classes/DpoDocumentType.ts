import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDpoDocumentType from '@/interfaces/IDpoDocumentType';
import IPageSection from '@/interfaces/IPageSection';

export default class DpoDocumentType implements IDpoDocumentType {
  id?: string;
  documentType: IPageSection = new PageSection();
  documentTypeId?: string;

  constructor(i?: IDpoDocumentType) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.documentTypeId = i.documentTypeId;
    if (i.documentType) {
      this.documentType = new PageSection(i.documentType);
    }
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(...this.documentType.getFileInfos());
    return fileInfos;
  }
}

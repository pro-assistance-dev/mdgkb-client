import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IWithDocumentType from '@/interfaces/IWithDocumentType';

export default class WithDocumentType implements IWithDocumentType {
  id?: string;
  documentType: PageSection = new PageSection();
  documentTypeId?: string;
  order = 0;
  constructor(i?: IWithDocumentType) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.documentTypeId = i.documentTypeId;
    this.order = i.order;
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

import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSection from '@/interfaces/IPageSection';
import IPostgraduateDocumentType from '@/interfaces/IPostgraduateDocumentType';

export default class PostgraduateDocumentType implements IPostgraduateDocumentType {
  id?: string;
  documentType: IPageSection = new PageSection();
  documentTypeId?: string;

  constructor(i?: IPostgraduateDocumentType) {
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

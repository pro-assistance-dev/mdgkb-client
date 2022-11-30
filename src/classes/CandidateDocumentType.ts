import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICandidateDocumentType from '@/interfaces/ICandidateDocumentType';
import IPageSection from '@/interfaces/IPageSection';

export default class CandidateDocumentType implements ICandidateDocumentType {
  id?: string;
  documentType: IPageSection = new PageSection();
  documentTypeId?: string;

  constructor(i?: ICandidateDocumentType) {
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

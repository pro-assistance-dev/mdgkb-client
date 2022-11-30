import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IAdmissionCommitteeDocumentType from '@/interfaces/IAdmissionCommitteeDocumentType';
import IPageSection from '@/interfaces/IPageSection';

export default class AdmissionCommitteeDocumentType implements IAdmissionCommitteeDocumentType {
  id?: string;
  documentType: IPageSection = new PageSection();
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
      this.documentType = new PageSection(i.documentType);
    }
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(...this.documentType.getFileInfos());
    return fileInfos;
  }
}

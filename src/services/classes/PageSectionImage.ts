import IFileInfo from '@/interfaces/files/IFileInfo';
import PageSection from '@/services/classes/page/PageSection';
import ClassHelper from '@/services/ClassHelper';

export default class PageSectionImage {
  id?: string;
  documentType: PageSection = new PageSection();
  documentTypeId?: string;
  order = 0;
  constructor(i?: PageSectionImage) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(...this.documentType.getFileInfos());
    return fileInfos;
  }
}

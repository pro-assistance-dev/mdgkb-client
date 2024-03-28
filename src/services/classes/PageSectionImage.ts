import FileInfo from '@/services/classes/FileInfo';
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

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    fileInfos.push(...this.documentType.getFileInfos());
    return fileInfos;
  }
}

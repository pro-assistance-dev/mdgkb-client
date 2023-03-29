import IFileInfo from '@/interfaces/files/IFileInfo';
import PageSection from '@/services/classes/page/PageSection';
import ClassHelper from '@/services/ClassHelper';

export default class PageDocument {
  id?: string;
  document: PageSection = new PageSection();
  documentId?: string;
  pageId?: string;

  constructor(i?: PageDocument) {
    ClassHelper.BuildClass(this, i);
  }

  static GetFileInfos(items: PageDocument[]): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];

    items.forEach((i: PageDocument) => {
      const fileInfo = i.document.scan;
      if (fileInfo) {
        fileInfos.push(fileInfo);
      }
    });

    return fileInfos;
  }
}

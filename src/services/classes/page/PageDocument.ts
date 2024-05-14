import FileInfo from '@/services/classes/FileInfo';
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

  static GetFileInfos(items: PageDocument[]): FileInfo[] {
    const fileInfos: FileInfo[] = [];

    items.forEach((i: PageDocument) => {
      const fileInfo = i.document.scan;
      if (fileInfo) {
        fileInfos.push(fileInfo);
      }
    });

    return fileInfos;
  }
}

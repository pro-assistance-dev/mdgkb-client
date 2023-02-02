import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class PageDocument {
  id?: string;

  document: PageSection = new PageSection();
  documentId?: string;

  pageId?: string;

  constructor(pageDocument?: PageDocument) {
    if (!pageDocument) {
      return;
    }
    this.id = pageDocument.id;
    this.documentId = pageDocument.documentId;
    // if (pageDocument.document) {
    //   this.document = new PageSection(pageDocument.document);
    // }
    this.pageId = pageDocument.pageId;
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

import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSection from '@/interfaces/IPageSection';
import IPageDocument from '@/interfaces/page/IPageDocument';

export default class PageDocument implements IPageDocument {
  id?: string;

  document: IPageSection = new PageSection();
  documentId?: string;

  pageId?: string;

  constructor(pageDocument?: IPageDocument) {
    if (!pageDocument) {
      return;
    }
    this.id = pageDocument.id;
    this.documentId = pageDocument.documentId;
    if (pageDocument.document) {
      this.document = new PageSection(pageDocument.document);
    }
    this.pageId = pageDocument.pageId;
  }

  static GetFileInfos(items: IPageDocument[]): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];

    items.forEach((i: IPageDocument) => {
      const fileInfo = i.document.scan;
      if (fileInfo) {
        fileInfos.push(fileInfo);
      }
    });

    return fileInfos;
  }
}

import Document from '@/classes/document/Document';
import IDocument from '@/interfaces/document/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageDocument from '@/interfaces/page/IPageDocument';

export default class PageDocument implements IPageDocument {
  id?: string;

  document: IDocument = new Document();
  documentId?: string;

  pageId?: string;

  constructor(pageDocument?: IPageDocument) {
    if (!pageDocument) {
      return;
    }
    this.id = pageDocument.id;
    this.documentId = pageDocument.documentId;
    if (pageDocument.document) {
      this.document = new Document(pageDocument.document);
    }
    this.pageId = pageDocument.pageId;
  }

  static GetFileInfos(items: IPageDocument[]): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];

    items.forEach((i: IPageDocument) => {
      const fileInfo = i.document.fileInfo;
      if (fileInfo) {
        fileInfos.push(fileInfo);
      }
    });

    return fileInfos;
  }
}

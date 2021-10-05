import IDocument from '@/interfaces/document/IDocument';

export default interface IPageDocument {
  id?: string;

  document: IDocument;
  documentId?: string;

  pageId?: string;
}

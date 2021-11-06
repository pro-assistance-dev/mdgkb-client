import IDocumentType from '@/interfaces/document/IDocumentType';

export default interface IPageDocument {
  id?: string;

  document: IDocumentType;
  documentId?: string;

  pageId?: string;
}

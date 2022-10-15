import IDocumentType from '@/interfaces/IDocumentType';

export default interface IPageDocument {
  id?: string;

  document: IDocumentType;
  documentId?: string;

  pageId?: string;
}

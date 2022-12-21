import IPageSection from '@/interfaces/IPageSection';

export default interface IPageDocument {
  id?: string;

  document: IPageSection;
  documentId?: string;

  pageId?: string;
}

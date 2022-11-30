import IPageSectionDocument from '@/interfaces/IPageSectionDocument';

export default interface IVacancyResponseToDocument {
  id?: string;
  vacancyResponseId?: string;
  document: IPageSectionDocument;
  documentId?: string;
}

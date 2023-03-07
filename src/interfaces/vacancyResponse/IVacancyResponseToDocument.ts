import PageSectionDocument from '@/services/classes/page/PageSectionDocument';

export default interface IVacancyResponseToDocument {
  id?: string;
  vacancyResponseId?: string;
  document: PageSectionDocument;
  documentId?: string;
}

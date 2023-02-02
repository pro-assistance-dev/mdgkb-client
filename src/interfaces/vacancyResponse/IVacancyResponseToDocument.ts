import PageSectionDocument from '@/classes/PageSectionDocument';

export default interface IVacancyResponseToDocument {
  id?: string;
  vacancyResponseId?: string;
  document: PageSectionDocument;
  documentId?: string;
}

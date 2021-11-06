import IDocument from '@/interfaces/document/IDocument';

export default interface IVacancyResponseToDocument {
  id?: string;
  vacancyResponseId?: string;
  document: IDocument;
  documentId?: string;
}

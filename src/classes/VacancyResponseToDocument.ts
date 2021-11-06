import Document from '@/classes/document/Document';
import IDocument from '@/interfaces/document/IDocument';
import IVacancyResponseToDocument from '@/interfaces/vacancyResponse/IVacancyResponseToDocument';

export default class VacancyResponseToDocument implements IVacancyResponseToDocument {
  id?: string;
  vacancyResponseId?: string;
  document: IDocument = new Document();
  documentId?: string;
  constructor(i?: IVacancyResponseToDocument) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.vacancyResponseId = i.vacancyResponseId;
    this.documentId = i.documentId;
    if (i.document) {
      this.document = new Document(i.document);
    }
  }
}

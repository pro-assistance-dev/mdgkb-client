import PageSectionDocument from '@/services/classes/page/PageSectionDocument';
import IVacancyResponseToDocument from '@/interfaces/vacancyResponse/IVacancyResponseToDocument';

export default class VacancyResponseToDocument implements IVacancyResponseToDocument {
  id?: string;
  vacancyResponseId?: string;
  document: PageSectionDocument = new PageSectionDocument();
  documentId?: string;
  constructor(i?: IVacancyResponseToDocument) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.vacancyResponseId = i.vacancyResponseId;
    this.documentId = i.documentId;
    if (i.document) {
      this.document = new PageSectionDocument(i.document);
    }
  }
}

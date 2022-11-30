import PageSectionDocument from '@/classes/PageSectionDocument';
import IPageSectionDocument from '@/interfaces/IPageSectionDocument';
import IVacancyResponseToDocument from '@/interfaces/vacancyResponse/IVacancyResponseToDocument';

export default class VacancyResponseToDocument implements IVacancyResponseToDocument {
  id?: string;
  vacancyResponseId?: string;
  document: IPageSectionDocument = new PageSectionDocument();
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

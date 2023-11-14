import PageSectionDocument from '@/services/classes/page/PageSectionDocument';
import ClassHelper from '@/services/ClassHelper';

export default class VacancyResponseToDocument {
  id?: string;
  vacancyResponseId?: string;
  document: PageSectionDocument = new PageSectionDocument();
  documentId?: string;
  constructor(i?: VacancyResponseToDocument) {
    ClassHelper.BuildClass(VacancyResponseToDocument);
  }
}

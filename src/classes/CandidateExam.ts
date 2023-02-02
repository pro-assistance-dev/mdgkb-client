import PageSection from '@/classes/PageSection';
import IForm from '@/interfaces/IForm';

import Form from './Form';

export default class CandidateExam {
  id?: string;
  formPattern: IForm = new Form();
  formPatternId?: string;
  documentTypeId?: string;
  documentType: PageSection = new PageSection();
  constructor(i?: CandidateExam) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }
    this.documentTypeId = i.documentTypeId;
    if (i.documentType) {
      this.documentType = new PageSection(i.documentType);
    }
  }
}

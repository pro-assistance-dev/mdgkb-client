import PageSection from '@/classes/PageSection';
import ICandidateExam from '@/interfaces/ICandidateExam';
import IForm from '@/interfaces/IForm';
import IPageSection from '@/interfaces/IPageSection';

import Form from './Form';

export default class CandidateExam implements ICandidateExam {
  id?: string;
  formPattern: IForm = new Form();
  formPatternId?: string;
  documentTypeId?: string;
  documentType: IPageSection = new PageSection();
  constructor(i?: ICandidateExam) {
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

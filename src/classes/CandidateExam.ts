import PageSection from '@/services/classes/page/PageSection';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';

export default class CandidateExam {
  id?: string;
  formPattern: Form = new Form();
  formPatternId?: string;
  documentTypeId?: string;
  documentType: PageSection = new PageSection();
  constructor(i?: CandidateExam) {
    ClassHelper.BuildClass(this, i);
  }
}

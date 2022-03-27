import ICandidateExam from '@/interfaces/ICandidateExam';
import IForm from '@/interfaces/IForm';

import Form from './Form';

export default class CandidateExam implements ICandidateExam {
  id?: string;
  formPattern: IForm = new Form();
  formPatternId?: string;

  constructor(i?: ICandidateExam) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }
  }
}

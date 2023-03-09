import PageSection from '@/services/classes/page/PageSection';

import IForm from './IForm';

export default interface ICandidateExam {
  id?: string;
  formPattern: IForm;
  formPatternId?: string;

  documentTypeId?: string;
  documentType: PageSection;
}

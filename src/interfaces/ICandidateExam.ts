import PageSection from '@/classes/PageSection';

import IForm from './IForm';

export default interface ICandidateExam {
  id?: string;
  formPattern: IForm;
  formPatternId?: string;

  documentTypeId?: string;
  documentType: PageSection;
}

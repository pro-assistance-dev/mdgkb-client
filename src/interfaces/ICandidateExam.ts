import IPageSection from '@/interfaces/IPageSection';

import IForm from './IForm';

export default interface ICandidateExam {
  id?: string;
  formPattern: IForm;
  formPatternId?: string;

  documentTypeId?: string;
  documentType: IPageSection;
}

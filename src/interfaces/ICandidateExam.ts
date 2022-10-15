import IDocumentType from '@/interfaces/IDocumentType';

import IForm from './IForm';

export default interface ICandidateExam {
  id?: string;
  formPattern: IForm;
  formPatternId?: string;

  documentTypeId?: string;
  documentType: IDocumentType;
}

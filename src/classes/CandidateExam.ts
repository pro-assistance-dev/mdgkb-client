import DocumentType from '@/classes/document/DocumentType';
import IDocumentType from '@/interfaces/document/IDocumentType';
import ICandidateExam from '@/interfaces/ICandidateExam';
import IForm from '@/interfaces/IForm';

import Form from './Form';

export default class CandidateExam implements ICandidateExam {
  id?: string;
  formPattern: IForm = new Form();
  formPatternId?: string;
  documentTypeId?: string;
  documentType: IDocumentType = new DocumentType();
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
      this.documentType = new DocumentType(i.documentType);
    }
  }
}

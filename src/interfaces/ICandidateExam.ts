import Form from '@/classes/Form';
import PageSection from '@/services/classes/page/PageSection';

export default interface ICandidateExam {
  id?: string;
  formPattern: Form;
  formPatternId?: string;

  documentTypeId?: string;
  documentType: PageSection;
}

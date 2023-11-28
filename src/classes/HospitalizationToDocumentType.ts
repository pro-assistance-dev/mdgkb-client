import HospitalizationType from '@/classes/HospitalizationType';
import PageSection from '@/services/classes/page/PageSection';
import ClassHelper from '@/services/ClassHelper';

export default class HospitalizationToDocumentType {
  id?: string;
  documentType?: PageSection;
  documentTypeId?: string;
  hospitalization?: HospitalizationType;
  hospitalizationId?: string;

  constructor(i?: HospitalizationToDocumentType) {
    ClassHelper.BuildClass(this, i);
  }
}

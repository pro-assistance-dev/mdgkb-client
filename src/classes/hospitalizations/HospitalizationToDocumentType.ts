import PageSection from '@/classes/PageSection';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import ClassHelper from '@/services/ClassHelper';

export default class HospitalizationToDocumentType {
  id?: string;
  documentType?: PageSection;
  documentTypeId?: string;
  hospitalization?: IHospitalizationType;
  hospitalizationId?: string;

  constructor(i?: HospitalizationToDocumentType) {
    ClassHelper.BuildClass(this, i);
  }
}

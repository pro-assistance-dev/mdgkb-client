import IHospitalizationType from '@/interfaces/IHospitalizationType';
import PageSection from '@/services/classes/page/PageSection';

export default interface IHospitalizationToDocumentType {
  id?: string;
  documentType?: PageSection;
  documentTypeId?: string;
  hospitalization?: IHospitalizationType;
  hospitalizationId?: string;
}

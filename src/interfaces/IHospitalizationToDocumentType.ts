import PageSection from '@/services/classes/page/PageSection';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalizationToDocumentType {
  id?: string;
  documentType?: PageSection;
  documentTypeId?: string;
  hospitalization?: IHospitalizationType;
  hospitalizationId?: string;
}

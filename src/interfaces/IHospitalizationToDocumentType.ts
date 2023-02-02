import PageSection from '@/classes/PageSection';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalizationToDocumentType {
  id?: string;
  documentType?: PageSection;
  documentTypeId?: string;
  hospitalization?: IHospitalizationType;
  hospitalizationId?: string;
}

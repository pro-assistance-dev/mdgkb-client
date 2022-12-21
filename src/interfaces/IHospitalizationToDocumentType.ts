import IHospitalizationType from '@/interfaces/IHospitalizationType';
import IPageSection from '@/interfaces/IPageSection';

export default interface IHospitalizationToDocumentType {
  id?: string;
  documentType?: IPageSection;
  documentTypeId?: string;
  hospitalization?: IHospitalizationType;
  hospitalizationId?: string;
}

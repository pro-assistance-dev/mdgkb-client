import IDocumentType from '@/interfaces/IDocumentType';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalizationToDocumentType {
  id?: string;
  documentType?: IDocumentType;
  documentTypeId?: string;
  hospitalization?: IHospitalizationType;
  hospitalizationId?: string;
}

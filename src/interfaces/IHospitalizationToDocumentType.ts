import IDocumentType from '@/interfaces/document/IDocumentType';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default interface IHospitalizationToDocumentType {
  id?: string;
  documentType?: IDocumentType;
  documentTypeId?: string;
  hospitalization?: IHospitalizationType;
  hospitalizationId?: string;
}

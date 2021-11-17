import IDocumentType from '@/interfaces/document/IDocumentType';
import IHospitalization from '@/interfaces/hospitalizations/IHospitalization';

export default interface IHospitalizationToDocumentType {
  id?: string;
  documentType?: IDocumentType;
  documentTypeId?: string;
  hospitalization?: IHospitalization;
  hospitalizationId?: string;
}

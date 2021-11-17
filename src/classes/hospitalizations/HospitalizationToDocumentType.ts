import DocumentType from '@/classes/document/DocumentType';
import Hospitalization from '@/classes/hospitalizations/Hospitalization';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IHospitalization from '@/interfaces/hospitalizations/IHospitalization';
import IHospitalizationToDocumentType from '@/interfaces/hospitalizations/IHospitalizationToDocumentType';

export default class HospitalizationToDocumentType implements IHospitalizationToDocumentType {
  id?: string;
  documentType?: IDocumentType;
  documentTypeId?: string;
  hospitalization?: IHospitalization;
  hospitalizationId?: string;

  constructor(hospitalizationToDocumentType?: IHospitalizationToDocumentType) {
    if (!hospitalizationToDocumentType) {
      return;
    }
    this.id = hospitalizationToDocumentType.id;
    if (hospitalizationToDocumentType.documentType) {
      this.documentType = new DocumentType(hospitalizationToDocumentType.documentType);
    }
    this.documentTypeId = hospitalizationToDocumentType.documentTypeId;
    if (hospitalizationToDocumentType.hospitalization) {
      this.hospitalization = new Hospitalization(hospitalizationToDocumentType.hospitalization);
    }
    this.hospitalizationId = hospitalizationToDocumentType.hospitalizationId;
  }
}

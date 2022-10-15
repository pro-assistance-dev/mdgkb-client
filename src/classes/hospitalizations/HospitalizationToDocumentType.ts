import DocumentType from '@/classes/document/DocumentType';
import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import IDocumentType from '@/interfaces/IDocumentType';
import IHospitalizationToDocumentType from '@/interfaces/IHospitalizationToDocumentType';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default class HospitalizationToDocumentType implements IHospitalizationToDocumentType {
  id?: string;
  documentType?: IDocumentType;
  documentTypeId?: string;
  hospitalization?: IHospitalizationType;
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
      this.hospitalization = new HospitalizationType(hospitalizationToDocumentType.hospitalization);
    }
    this.hospitalizationId = hospitalizationToDocumentType.hospitalizationId;
  }
}

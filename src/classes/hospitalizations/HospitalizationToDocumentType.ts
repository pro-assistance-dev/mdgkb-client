import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import PageSection from '@/classes/PageSection';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import IPageSection from '@/interfaces/IPageSection';

export default class HospitalizationToDocumentType {
  id?: string;
  documentType?: IPageSection;
  documentTypeId?: string;
  hospitalization?: IHospitalizationType;
  hospitalizationId?: string;

  constructor(hospitalizationToDocumentType?: HospitalizationToDocumentType) {
    if (!hospitalizationToDocumentType) {
      return;
    }
    this.id = hospitalizationToDocumentType.id;
    // if (hospitalizationToDocumentType.documentType) {
    //   this.documentType = new PageSection(hospitalizationToDocumentType.documentType);
    // }
    this.documentTypeId = hospitalizationToDocumentType.documentTypeId;
    if (hospitalizationToDocumentType.hospitalization) {
      this.hospitalization = new HospitalizationType(hospitalizationToDocumentType.hospitalization);
    }
    this.hospitalizationId = hospitalizationToDocumentType.hospitalizationId;
  }
}

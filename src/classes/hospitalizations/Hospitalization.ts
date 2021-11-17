import HospitalizationToDocumentType from '@/classes/hospitalizations/HospitalizationToDocumentType';
import IHospitalization from '@/interfaces/hospitalizations/IHospitalization';
import IHospitalizationToDocumentType from '@/interfaces/hospitalizations/IHospitalizationToDocumentType';

export default class Hospitalization implements IHospitalization {
  id?: string;
  name = '';
  paid = false;
  hospitalizationsToDocumentTypes?: IHospitalizationToDocumentType[];

  constructor(hospitalization?: IHospitalization) {
    if (!hospitalization) {
      return;
    }
    this.id = hospitalization.id;
    this.name = hospitalization.name;
    this.paid = hospitalization.paid;
    if (hospitalization.hospitalizationsToDocumentTypes) {
      this.hospitalizationsToDocumentTypes = hospitalization.hospitalizationsToDocumentTypes.map((item) => {
        return new HospitalizationToDocumentType(item);
      });
    }
  }
}

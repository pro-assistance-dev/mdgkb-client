import IHospitalizationDocument from '@/interfaces/IHospitalizationDocument';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default class HospitalizationDocument implements IHospitalizationDocument {
  id?: string;
  name = '';
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  children = true;
  constructor(i?: IHospitalizationDocument) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.children = i.children;
    this.hospitalizationTypeId = i.hospitalizationTypeId;
  }
}

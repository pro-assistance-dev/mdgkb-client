import IHospitalizationType from '@/interfaces/IHospitalizationType';
import IHospitalizationTypeDocument from '@/interfaces/IHospitalizationTypeDocument';

export default class HospitalizationTypeDocument implements IHospitalizationTypeDocument {
  id?: string;
  name = '';
  order = 0;
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  children = true;
  constructor(i?: IHospitalizationTypeDocument) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.order = i.order;
    this.name = i.name;
    this.children = i.children;
    this.hospitalizationTypeId = i.hospitalizationTypeId;
  }
}

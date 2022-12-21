import IHospitalizationType from '@/interfaces/IHospitalizationType';
import IHospitalizationTypeAnalyze from '@/interfaces/IHospitalizationTypeAnalize';

export default class HospitalizationTypeAnalyze implements IHospitalizationTypeAnalyze {
  id?: string;
  name = '';
  order = 0;
  durationDays = 0;
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  children = true;
  constructor(i?: IHospitalizationTypeAnalyze) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.order = i.order;
    this.name = i.name;
    this.durationDays = i.durationDays;
    this.children = i.children;
    this.hospitalizationTypeId = i.hospitalizationTypeId;
  }
}

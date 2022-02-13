import IHospitalizationAnalysis from '@/interfaces/IHospitalizationAnalize';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

export default class HospitalizationAnalysis implements IHospitalizationAnalysis {
  id?: string;
  name = '';
  durationDays = 0;
  hospitalizationType?: IHospitalizationType;
  hospitalizationTypeId?: string;
  children = true;
  constructor(i?: IHospitalizationAnalysis) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.durationDays = i.durationDays;
    this.children = i.children;
    this.hospitalizationTypeId = i.hospitalizationTypeId;
  }
}

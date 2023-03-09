import IHospitalizationStageComment from '@/interfaces/IHospitalizationStageComment';

export default class HospitalizationStageComment implements IHospitalizationStageComment {
  id?: string;
  hospitalizationStageId?: string;
  name = '';
  constructor(i?: IHospitalizationStageComment) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
  }
}

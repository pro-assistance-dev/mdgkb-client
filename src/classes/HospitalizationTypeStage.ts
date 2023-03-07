import HospitalizationStageComment from '@/classes/HospitalizationStageComment';
import IHospitalizationStageComment from '@/interfaces/IHospitalizationStageComment';
import IHospitalizationTypeStage from '@/interfaces/IHospitalizationTypeStage';

export default class HospitalizationTypeStage implements IHospitalizationTypeStage {
  id?: string;
  name = '';
  order = 0;
  hospitalizationStageComments: IHospitalizationStageComment[] = [];
  constructor(i?: IHospitalizationTypeStage) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.order = i.order;
    this.name = i.name;
    if (i.hospitalizationStageComments) {
      this.hospitalizationStageComments = i.hospitalizationStageComments.map(
        (item: IHospitalizationStageComment) => new HospitalizationStageComment(item)
      );
    }
  }
}

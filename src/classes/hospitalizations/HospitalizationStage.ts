import HospitalizationStageComment from '@/classes/hospitalizations/HospitalizationStageComment';
import IHospitalizationStage from '@/interfaces/IHospitalizationStage';
import IHospitalizationStageComment from '@/interfaces/IHospitalizationStageComment';

export default class HospitalizationStage implements IHospitalizationStage {
  id?: string;
  name = '';
  hospitalizationStageComments: IHospitalizationStageComment[] = [];
  constructor(i?: IHospitalizationStage) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    if (i.hospitalizationStageComments) {
      this.hospitalizationStageComments = i.hospitalizationStageComments.map(
        (item: IHospitalizationStageComment) => new HospitalizationStageComment(item)
      );
    }
  }
}

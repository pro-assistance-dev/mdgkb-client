import HospitalizationStageComment from '@/classes/HospitalizationStageComment';
import ClassHelper from '@/services/ClassHelper';

export default class HospitalizationTypeStage {
  id?: string;
  name = '';
  order = 0;
  hospitalizationStageComments: HospitalizationStageComment[] = [];
  constructor(i?: HospitalizationTypeStage) {
    ClassHelper.BuildClass(this, i);
  }
}

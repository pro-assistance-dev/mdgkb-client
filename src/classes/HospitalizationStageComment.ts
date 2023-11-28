import ClassHelper from '@/services/ClassHelper';

export default class HospitalizationStageComment {
  id?: string;
  hospitalizationStageId?: string;
  name = '';
  constructor(i?: HospitalizationStageComment) {
    ClassHelper.BuildClass(this, i);
  }
}

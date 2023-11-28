import HospitalizationType from '@/classes/HospitalizationType';
import ClassHelper from '@/services/ClassHelper';

export default class HospitalizationTypeAnalyze {
  id?: string;
  name = '';
  order = 0;
  durationDays = 0;
  hospitalizationType?: HospitalizationType;
  hospitalizationTypeId?: string;
  children = true;
  constructor(i?: HospitalizationTypeAnalyze) {
    ClassHelper.BuildClass(this, i);
  }
}

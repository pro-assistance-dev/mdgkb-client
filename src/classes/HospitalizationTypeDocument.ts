import HospitalizationType from '@/classes/HospitalizationType';
import ClassHelper from '@/services/ClassHelper';

export default class HospitalizationTypeDocument {
  id?: string;
  name = '';
  order = 0;
  hospitalizationType?: HospitalizationType;
  hospitalizationTypeId?: string;
  children = true;
  constructor(i?: HospitalizationTypeDocument) {
    ClassHelper.BuildClass(this, i);
  }
}

import Diet from '@/classes/Diet';
import ClassHelper from '@/services/ClassHelper';

export default class DietGroup {
  id?: string;
  name = '';
  diets: Diet[] = [];

  constructor(i?: DietGroup) {
    ClassHelper.BuildClass(this, i);
  }
}

import ClassHelper from '@/services/ClassHelper';

export default class PreparationRule {
  id?: string;
  name = '';
  time = '';

  constructor(i?: PreparationRule) {
    ClassHelper.BuildClass(this, i);
  }
}

import ClassHelper from '@/services/ClassHelper';
export default class TreatDirection {
  id?: string;
  name = '';

  constructor(i?: TreatDirection) {
    ClassHelper.BuildClass(this, i);
  }
}

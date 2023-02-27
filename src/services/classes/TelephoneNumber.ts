import ClassHelper from '@/services/ClassHelper';

export default class TelephoneNumber {
  id?: string;
  number?: string;
  description?: string;

  constructor(i?: TelephoneNumber) {
    ClassHelper.BuildClass(this, i);
  }
}

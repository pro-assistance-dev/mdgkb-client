import ClassHelper from '@/services/ClassHelper';

export default class Address {
  id = '';
  name = '';
  type = '';
  typeShort = '';
  zip = '';

  constructor(i?: Address) {
    ClassHelper.BuildClass(this, i);
  }

  getFullName(): string {
    return `${this.typeShort}. ${this.name}`;
  }
}

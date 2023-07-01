import ClassHelper from '@/services/ClassHelper';

export default class Address {
  id = '';
  name = '';
  type = '';
  zip = '';

  constructor(i?: Address) {
    ClassHelper.BuildClass(this, i);
  }

  getFullName(): string {
    return `${this.name} ${this.type}`;
  }
}

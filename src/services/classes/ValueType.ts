import ClassHelper from '@/services/ClassHelper';
import ValueRelation from '@/services/interfaces/ValueRelation';

export default class ValueType {
  id?: string;
  name?: string;
  valueRelation: ValueRelation = ValueRelation.simple;

  constructor(i?: ValueType) {
    ClassHelper.BuildClass(this, i);
  }

  isString(): boolean {
    return this.name === 'string';
  }

  isNumber(): boolean {
    return this.name === 'number';
  }

  isDate(): boolean {
    return this.name === 'date';
  }

  isDateTime(): boolean {
    return this.name === 'dateTime';
  }

  isRadio(): boolean {
    return this.name === 'radio';
  }

  isSet(): boolean {
    return this.name === 'set';
  }

  isText(): boolean {
    return this.name === 'text';
  }

  isBoolean(): boolean {
    return this.name === 'boolean';
  }

  isFile(): boolean {
    return this.name === 'file';
  }

  isFiles(): boolean {
    return this.name === 'files';
  }
}

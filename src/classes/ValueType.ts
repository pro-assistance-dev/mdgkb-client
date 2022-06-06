import IValueType from '@/interfaces/IValueType';
import ValueRelation from '@/interfaces/ValueRelation';

export default class ValueType implements IValueType {
  id?: string;
  name?: string;
  valueRelation: ValueRelation = ValueRelation.simple;

  constructor(valueType?: IValueType) {
    if (!valueType) {
      return;
    }
    this.id = valueType.id;
    this.name = valueType.name;
    // this.valueRelation = valueType.valueRelation;
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

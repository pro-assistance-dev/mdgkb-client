import ClassHelper from '@/services/ClassHelper';
import ValueRelation from '@/services/interfaces/ValueRelation';

import ValueTypes from '../types/ValueTypes';

export default class ValueType {
  id?: string;
  name: ValueTypes = ValueTypes.String;
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
  getComponentType(): string | undefined {
    if (this.name === ValueTypes.Radio) {
      return 'RadioProp';
    }
    if (this.name === ValueTypes.Set) {
      return 'SetProp';
    }
    if (this.name === ValueTypes.Number) {
      return 'NumberProp';
    }
    if (this.name === ValueTypes.String) {
      return 'StringProp';
    }
    // return ValueTypesComponentMap[this.name].name;
  }
}

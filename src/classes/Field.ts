import ValueType from '@/classes/ValueType';
import IField from '@/interfaces/IField';
import IValueType from '@/interfaces/IValueType';

export default class Field implements IField {
  id?: string;
  name = '';
  order = 0;
  formId?: string;
  valueTypeId = '';
  valueType: IValueType = new ValueType();

  constructor(i?: IField) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.valueType = i.valueType;
    this.order = i.order;
    this.formId = i.formId;
    this.valueTypeId = i.valueTypeId;
    if (i.valueType) {
      this.valueType = new ValueType(i.valueType);
    }
  }
}

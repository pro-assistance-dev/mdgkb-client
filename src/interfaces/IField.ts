import ValueType from '@/classes/ValueType';

export default interface IField {
  id?: string;
  name: string;
  order: number;
  formId?: string;
  valueType: ValueType;
  valueTypeId: string;
}

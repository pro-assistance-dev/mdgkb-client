import ValueRelation from '@/services/interfaces/ValueRelation';

export default interface IValueType {
  id?: string;
  name?: string;
  valueRelation: ValueRelation;

  isString: () => boolean;
  isNumber: () => boolean;
  isDate: () => boolean;
  isDateTime: () => boolean;
  isRadio: () => boolean;
  isSet: () => boolean;
  isText: () => boolean;
  isBoolean: () => boolean;
  isFile: () => boolean;
  isFiles: () => boolean;
}

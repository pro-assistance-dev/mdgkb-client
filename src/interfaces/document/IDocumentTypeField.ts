import IValueType from '@/interfaces/IValueType';

export default interface IDocumentTypeField {
  id?: string;
  name: string;
  type: string;
  order: number;
  documentTypeId?: string;
  valueType?: IValueType;
  valueTypeId?: string;
}

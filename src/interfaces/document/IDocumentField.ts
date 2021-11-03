import IValueType from '@/interfaces/IValueType';

export default interface IDocumentField {
  id?: string;
  name: string;
  type: string;
  order: number;
  documentId?: string;
  valueType?: IValueType;
  valueTypeId?: string;
}

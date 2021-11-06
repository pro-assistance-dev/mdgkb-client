import IDocumentTypeField from '@/interfaces/document/IDocumentTypeField';
import IValueType from '@/interfaces/IValueType';

export default class DocumentTypeField implements IDocumentTypeField {
  id?;
  name = '';
  type = '';
  order = 0;
  documentTypeId?: string;
  valueTypeId?: string;
  valueType?: IValueType;

  constructor(i?: IDocumentTypeField) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.type = i.type;
    this.order = i.order;
    this.documentTypeId = i.documentTypeId;
    this.valueTypeId = i.valueTypeId;
  }
}

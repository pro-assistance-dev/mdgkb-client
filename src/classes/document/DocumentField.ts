import IDocumentField from '@/interfaces/document/IDocumentField';
import IValueType from '@/interfaces/IValueType';

export default class DocumentField implements IDocumentField {
  id?;
  name = '';
  type = '';
  order = 0;
  documentId?: string;
  valueTypeId?: string;
  valueType?: IValueType;

  constructor(i?: IDocumentField) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.type = i.type;
    this.order = i.order;
    this.documentId = i.documentId;
  }
}

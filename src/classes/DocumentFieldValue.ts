import IDocumentFieldValue from '@/interfaces/IDocumentFieldValue';

export default class DocumentFieldValue implements IDocumentFieldValue {
  id?: string;
  documentId?: string;
  documentTypeFieldId?: string;
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date;

  constructor(i?: IDocumentFieldValue) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.documentId = i.documentId;
    this.documentTypeFieldId = i.documentTypeFieldId;
    this.valueString = i.valueString;
    this.valueNumber = i.valueNumber;
    this.valueDate = i.valueDate;
  }
}

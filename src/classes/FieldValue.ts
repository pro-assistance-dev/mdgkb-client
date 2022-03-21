import IFieldValue from '@/interfaces/IFieldValue';

import Field from './Field';
import FileInfo from './File/FileInfo';

export default class FieldValue implements IFieldValue {
  id?: string;
  fieldId?: string;
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date;
  eventApplicationId?: string;
  file = new FileInfo();
  fileId?: string;
  field = new Field();

  constructor(i?: IFieldValue) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.fieldId = i.fieldId;
    this.eventApplicationId = i.eventApplicationId;
    this.valueString = i.valueString;
    this.valueNumber = i.valueNumber;
    this.valueDate = i.valueDate;
    this.fileId = i.fileId;
    if (i.file) {
      this.file = new FileInfo(i.file);
    }
    if (i.field) {
      this.field = new Field(i.field);
    }
  }
}

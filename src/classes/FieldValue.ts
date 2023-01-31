import FieldValueFile from '@/classes/FieldValueFile';
import IFieldValue from '@/interfaces/IFieldValue';
import IFieldValueFile from '@/interfaces/IFieldValueFile';

import Field from './Field';
import FileInfo from './File/FileInfo';

export default class FieldValue implements IFieldValue {
  id?: string;
  fieldId?: string;
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date;
  eventApplicationId?: string;
  modChecked = false;
  modComment?: string;
  file = new FileInfo();
  fileId?: string;
  field = new Field();
  showError = false; // Display validation error
  errorText = 'Это поле обязательно к заполнению';
  fieldValuesFiles: IFieldValueFile[] = [];
  fieldValuesFilesForDelete: string[] = [];
  constructor(i?: IFieldValue) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.fieldId = i.fieldId;
    this.eventApplicationId = i.eventApplicationId;
    this.valueString = i.valueString;
    this.modComment = i.modComment;
    this.valueNumber = i.valueNumber;
    if (i.errorText) {
      this.errorText = i.errorText;
    }
    if (i.modChecked) {
      this.modChecked = i.modChecked;
    }
    if (i.showError) {
      this.showError = i.showError;
    }
    this.valueDate = i.valueDate;
    this.fileId = i.fileId;
    if (i.file) {
      this.file = new FileInfo(i.file);
    }
    if (i.field) {
      this.field = new Field(i.field);
    }
    if (i.fieldValuesFiles) {
      this.fieldValuesFiles = i.fieldValuesFiles.map((item: IFieldValueFile) => new FieldValueFile(item));
    }
  }

  validate(): void {
    if (this.field.valueType.isString()) {
      this.showError = !this.valueString;
      return;
    }
    if (this.field.valueType.isNumber()) {
      this.showError = !this.valueNumber;
      return;
    }
    if (this.field.valueType.isDate()) {
      this.showError = !this.valueDate;
      return;
    }
    if (this.field.valueType.isFile()) {
      this.showError = !this.file.fileSystemPath;
      return;
    }
    if (this.field.valueType.isText()) {
      this.showError = !this.valueString;
      return;
    }
    if (this.field.valueType.isFiles()) {
      this.showError = !this.fieldValuesFiles.length;
      return;
    }
  }

  clearIds(): void {
    this.id = undefined;
    if (this.field) {
      this.field.id = undefined;
    }
  }

  addFieldValueFile(): void {
    this.fieldValuesFiles.push(new FieldValueFile());
  }

  setValueDate(value: Date): void {
    this.valueDate = value;
  }
}

import Field from '@/classes/Field';
import FieldValueFile from '@/classes/FieldValueFile';
import FileInfo from '@/classes/FileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class FieldValue {
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
  @ClassHelper.GetClassConstructor(FieldValueFile)
  fieldValuesFiles: FieldValueFile[] = [];
  fieldValuesFilesForDelete: string[] = [];
  constructor(i?: FieldValue) {
    ClassHelper.BuildClass(this, i);
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

  setValue(value: unknown): void {
    switch (typeof value) {
      case 'number':
        this.valueNumber = value as number;
        break;
      case 'string':
        this.valueString = value as string;
        break;
    }
  }

  getValue(): unknown {
    if (this.field.valueType.isText() || this.field.valueType.isString()) {
      return this.valueString;
    }
    if (this.field.valueType.isNumber()) {
      return this.valueNumber;
    }
  }
}

import Field from '@/classes/Field';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IField from '@/interfaces/IField';
import IFieldValue from '@/interfaces/IFieldValue';
import IForm from '@/interfaces/IForm';

import FieldValue from './FieldValue';

export default class Form implements IForm {
  id?: string;
  title?: string;
  name = '';

  fields: IField[] = [];
  fieldValues: IFieldValue[] = [];
  fieldValuesForDelete = [];
  validated = true;

  constructor(i?: IForm) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.title = i.title;
    if (i.validated) {
      this.validated = i.validated;
    }
    if (i.fields) {
      this.fields = i.fields.map((item: IField) => new Field(item));
    }
    if (i.fieldValues) {
      this.fieldValues = i.fieldValues.map((item: IFieldValue) => new FieldValue(item));
    }
  }

  addField(field?: IField): void {
    this.fields.push(field ?? new Field());
  }
  removeField(index: number): void {
    this.fields.splice(index, 1);
  }
  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.fields.forEach((i: IField) => {
      if (i.file) {
        fileInfos.push(i.file);
      }
    });
    return fileInfos;
  }

  findFieldValue(fieldId: string): IFieldValue | undefined {
    return this.fieldValues.find((fieldValue: IFieldValue) => fieldId === fieldValue.fieldId);
  }

  getFieldValue(field: IField): string | number | Date | IFileInfo | boolean | undefined {
    if (!field.id) {
      return;
    }
    const fieldValue = this.findFieldValue(field.id);
    if (!fieldValue) {
      return;
    }
    if (field.valueType.isString()) {
      return fieldValue.valueString;
    }
    if (field.valueType.isNumber()) {
      return fieldValue.valueNumber;
    }
    if (field.valueType.isDate()) {
      return fieldValue.valueDate;
    }
    if (field.valueType.isFile()) {
      return fieldValue.file;
    }
  }
  initFieldsValues(): void {
    this.fields.forEach((field: IField) => {
      const fieldValue = new FieldValue();
      fieldValue.fieldId = field.id;
      fieldValue.field = new Field(field);
      this.fieldValues.push(fieldValue);
    });
  }

  validate(): void {
    this.validated = true;
    this.fieldValues.forEach((el: IFieldValue) => {
      if (el.field?.required) {
        el.validate();
        if (el.showError) {
          this.validated = false;
        }
      }
    });
  }
}

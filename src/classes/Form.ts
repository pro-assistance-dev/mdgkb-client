import Field from '@/classes/Field';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IField from '@/interfaces/IField';
import IFieldValue from '@/interfaces/IFieldValue';
import IForm from '@/interfaces/IForm';

import FieldValue from './FieldValue';
import User from './User';

export default class Form implements IForm {
  id?: string;
  title?: string;
  name = '';
  code = '';
  fields: IField[] = [];
  fieldsForDelete: string[] = [];
  fieldValues: IFieldValue[] = [];
  fieldValuesForDelete: string[] = [];
  validated = true;
  isNew = true;
  createdAt: Date = new Date();
  user = new User();
  // changed = false;

  constructor(i?: IForm) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.title = i.title;
    if (i.createdAt) {
      this.createdAt = i.createdAt;
    }
    if (i.isNew !== undefined) {
      this.isNew = i.isNew;
    }
    if (i.validated) {
      this.validated = i.validated;
    }
    this.code = i.code;
    if (i.user) {
      this.user = new User(i.user);
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
  getFieldValuesFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.fieldValues.forEach((i: IFieldValue) => {
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

  clearIds(): void {
    this.id = undefined;
    this.fields.forEach((el: IField) => {
      el.clearIds();
    });
    this.fieldValues.forEach((el: IFieldValue) => {
      el.clearIds();
    });
  }

  removeAllFieldsAndValues(): void {
    this.fields.forEach((el: IField) => {
      if (el.id) this.fieldsForDelete.push(el.id);
    });
    this.fieldValues.forEach((el: IFieldValue) => {
      if (el.id) this.fieldValuesForDelete.push(el.id);
    });
    this.fields = [];
    this.fieldValues = [];
  }
  applyFormPatternFields(pattern: IForm): void {
    this.fields = pattern.fields.map((el: IField) => {
      el.formId = undefined;
      el.fileId = undefined;
      // const fieldValue = new FieldValue();
      // fieldValue.fieldId = el.id;
      // fieldValue.field = new Field(el);
      // this.fieldValues.push(fieldValue);
      return el;
    });
  }
  isFieldValuesModChecked(): boolean {
    return this.fieldValues.every((el) => el.modChecked === true);
  }
  changeFieldValuesModChecked(modChecked: boolean): void {
    this.fieldValues.forEach((el: IFieldValue) => (el.modChecked = modChecked));
  }
  // static ApplyFormPattern(pattern: IForm): IForm {
  //   const form = new Form(pattern);
  //   form.id = undefined;
  //   form.fields.forEach((el: IField) => {
  // el.id = undefined;
  //     el.formId = undefined;
  //     el.fileId = undefined;
  //   });
  //   return form;
  // }
}

import IFileInfo from '@/interfaces/files/IFileInfo';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IField from '@/interfaces/IField';
import IFieldValue from '@/interfaces/IFieldValue';

import DpoCourse from './DpoCourse';
import Field from './Field';
import FieldValue from './FieldValue';
import User from './User';

export default class DpoApplication implements IDpoApplication {
  id?: string;
  userId?: string;
  dpoCourseId?: string;
  createdAt = new Date();
  user = new User();
  isNew = true;
  dpoCourse = new DpoCourse();
  fieldValues: IFieldValue[] = [];

  constructor(dpoApplication?: IDpoApplication) {
    if (!dpoApplication) {
      return;
    }
    this.id = dpoApplication.id;
    this.userId = dpoApplication.userId;
    this.createdAt = dpoApplication.createdAt;
    this.isNew = dpoApplication.isNew;
    this.dpoCourseId = dpoApplication.dpoCourseId;
    if (dpoApplication.user) {
      this.user = new User(dpoApplication.user);
    }
    if (dpoApplication.dpoCourse) {
      this.dpoCourse = new DpoCourse(dpoApplication.dpoCourse);
    }
    if (dpoApplication.fieldValues) {
      this.fieldValues = dpoApplication.fieldValues.map((item: IFieldValue) => new FieldValue(item));
    }
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
  initFieldsValues(fields: IField[]): void {
    fields.forEach((field: IField) => {
      const fieldValue = new FieldValue();
      fieldValue.fieldId = field.id;
      fieldValue.field = new Field(field);
      this.fieldValues.push(fieldValue);
    });
  }
  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.fieldValues.forEach((i: IFieldValue) => {
      if (i.file) {
        fileInfos.push(i.file);
      }
    });
    return fileInfos;
  }
}

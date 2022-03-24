import IFileInfo from '@/interfaces/files/IFileInfo';
import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';
import IField from '@/interfaces/IField';
import IFieldValue from '@/interfaces/IFieldValue';

import PostgraduateCourse from './PostgraduateCourse';
import Field from './Field';
import FieldValue from './FieldValue';
import User from './User';

export default class PostgraduateApplication implements IPostgraduateApplication {
  id?: string;
  userId?: string;
  postgraduateCourseId?: string;
  createdAt = new Date();
  user = new User();
  isNew = true;
  postgraduateCourse = new PostgraduateCourse();
  fieldValues: IFieldValue[] = [];

  constructor(postgraduateApplication?: IPostgraduateApplication) {
    if (!postgraduateApplication) {
      return;
    }
    this.id = postgraduateApplication.id;
    this.userId = postgraduateApplication.userId;
    this.createdAt = postgraduateApplication.createdAt;
    this.isNew = postgraduateApplication.isNew;
    this.postgraduateCourseId = postgraduateApplication.postgraduateCourseId;
    if (postgraduateApplication.user) {
      this.user = new User(postgraduateApplication.user);
    }
    if (postgraduateApplication.postgraduateCourse) {
      this.postgraduateCourse = new PostgraduateCourse(postgraduateApplication.postgraduateCourse);
    }
    if (postgraduateApplication.fieldValues) {
      this.fieldValues = postgraduateApplication.fieldValues.map((item: IFieldValue) => new FieldValue(item));
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
  isFieldValuesModChecked(): boolean {
    return this.fieldValues.every((el) => el.modChecked === true);
  }
  changeFieldValuesModChecked(modChecked: boolean): void {
    this.fieldValues.forEach((el: IFieldValue) => (el.modChecked = modChecked));
  }
}

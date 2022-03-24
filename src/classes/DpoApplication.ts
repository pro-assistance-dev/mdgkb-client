import IFileInfo from '@/interfaces/files/IFileInfo';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IFieldValue from '@/interfaces/IFieldValue';

import DpoCourse from './DpoCourse';
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

  isFieldValuesModChecked(): boolean {
    return this.fieldValues.every((el) => el.modChecked === true);
  }
  changeFieldValuesModChecked(modChecked: boolean): void {
    this.fieldValues.forEach((el: IFieldValue) => (el.modChecked = modChecked));
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

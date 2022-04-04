import IField from '@/interfaces/IField';

import IFileInfo from './files/IFileInfo';
import IFieldValue from './IFieldValue';
import IUser from './IUser';

export default interface IForm {
  id?: string;
  title?: string;
  code: string;
  fields: IField[];
  fieldsForDelete: string[];
  fieldValues: IFieldValue[];
  fieldValuesForDelete: string[];
  validated?: boolean;
  createdAt?: Date;
  isNew: boolean;
  user: IUser;

  addField(field?: IField): void;
  removeField(index: number): void;
  getFileInfos: () => IFileInfo[];
  getFieldValuesFileInfos: () => IFileInfo[];
  initFieldsValues: () => void;
  getFieldValue: (field: IField) => string | number | Date | IFileInfo | boolean | undefined;
  findFieldValue: (fieldId: string) => IFieldValue | undefined;
  validate: () => void;
  clearIds: () => void;
  removeAllFieldsAndValues: () => void;
  applyFormPatternFields: (pattern: IForm) => void;
  isFieldValuesModChecked: () => boolean;
  changeFieldValuesModChecked: (modChecked: boolean) => void;
}

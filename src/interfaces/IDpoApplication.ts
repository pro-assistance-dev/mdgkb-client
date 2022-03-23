import IFileInfo from './files/IFileInfo';
import IDpoCourse from './IDpoCourse';
import IField from './IField';
import IFieldValue from './IFieldValue';
import IUser from './IUser';

export default interface IDpoApplication {
  id?: string;
  userId?: string;
  dpoCourseId?: string;
  user: IUser;
  dpoCourse: IDpoCourse;
  createdAt: Date;
  isNew: boolean;
  fieldValues: IFieldValue[];

  getFileInfos: () => IFileInfo[];
  initFieldsValues: (fields: IField[]) => void;
  getFieldValue: (field: IField) => string | number | Date | IFileInfo | boolean | undefined;
  findFieldValue: (fieldId: string) => IFieldValue | undefined;
  isFieldValuesModChecked: () => boolean;
  changeFieldValuesModChecked: (modChecked: boolean) => void;
}

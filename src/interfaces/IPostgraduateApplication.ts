import IFileInfo from './files/IFileInfo';
import IPostgraduateCourse from './IPostgraduateCourse';
import IField from './IField';
import IFieldValue from './IFieldValue';
import IUser from './IUser';

export default interface IPostgraduateApplication {
  id?: string;
  userId?: string;
  postgraduateCourseId?: string;
  user: IUser;
  postgraduateCourse: IPostgraduateCourse;
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

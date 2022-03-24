import IFileInfo from './files/IFileInfo';
import IDpoCourse from './IDpoCourse';
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
  isFieldValuesModChecked: () => boolean;
  changeFieldValuesModChecked: (modChecked: boolean) => void;
}

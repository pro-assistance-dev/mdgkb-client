import IFileInfo from './files/IFileInfo';
import IDpoCourse from './IDpoCourse';
import IForm from './IForm';

export default interface IDpoApplication {
  id?: string;
  dpoCourse: IDpoCourse;
  dpoCourseId?: string;
  formValue: IForm;
  formValueId?: string;

  getFileInfos: () => IFileInfo[];
}

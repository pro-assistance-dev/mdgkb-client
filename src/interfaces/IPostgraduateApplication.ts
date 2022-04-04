import IFileInfo from './files/IFileInfo';
import IForm from './IForm';
import IPostgraduateCourse from './IPostgraduateCourse';

export default interface IPostgraduateApplication {
  id?: string;
  postgraduateCourseId?: string;
  postgraduateCourse: IPostgraduateCourse;
  formValue: IForm;
  formValueId?: string;

  getFileInfos: () => IFileInfo[];
}

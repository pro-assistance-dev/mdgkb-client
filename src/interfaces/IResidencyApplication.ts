import IFileInfo from './files/IFileInfo';
import IForm from './IForm';
import IResidencyCourse from './IResidencyCourse';

export default interface IResidencyApplication {
  id?: string;
  residencyCourse: IResidencyCourse;
  residencyCourseId?: string;
  formValue: IForm;
  formValueId?: string;

  getFileInfos: () => IFileInfo[];
}

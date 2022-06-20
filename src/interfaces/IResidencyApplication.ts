import IFileInfo from './files/IFileInfo';
import IForm from './IForm';
import IResidencyCourse from './IResidencyCourse';

export default interface IResidencyApplication {
  id?: string;
  residencyCourse: IResidencyCourse;
  residencyCourseId?: string;
  pointsEntrance: number;
  pointsAchievements: number;
  main: boolean;
  paid: boolean;
  formValue: IForm;
  formValueId?: string;

  getFileInfos: () => IFileInfo[];
  pointsSum: () => number;
}

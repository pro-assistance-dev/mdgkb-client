import IDivision from '@/interfaces/buildings/IDivision';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IForm from '@/interfaces/IForm';
import IGate from '@/interfaces/IGate';

export default interface IApplicationCar {
  id?: string;
  division?: IDivision;
  divisionId?: string;
  gate?: IGate;
  gateId?: string;
  formValue: IForm;
  formValueId?: string;

  getFileInfos: () => IFileInfo[];
}

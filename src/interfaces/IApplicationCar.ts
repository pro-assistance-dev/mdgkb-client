import IDivision from '@/interfaces/buildings/IDivision';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IForm from '@/interfaces/IForm';
import IGate from '@/interfaces/IGate';
import IVisit from '@/interfaces/IVisit';

export default interface IApplicationCar {
  id?: string;
  division: IDivision;
  divisionId?: string;
  gate?: IGate;
  gateId?: string;
  formValue: IForm;
  formValueId?: string;
  visits: IVisit[];
  visitsForDelete: string[];

  getFileInfos: () => IFileInfo[];
  addVisit: () => void;
  removeVisit: (index: number) => void;
}

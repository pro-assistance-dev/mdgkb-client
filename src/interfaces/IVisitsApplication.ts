import IFileInfo from '@/interfaces/files/IFileInfo';
import IDivision from '@/interfaces/IDivision';
import IForm from '@/interfaces/IForm';
import IGate from '@/interfaces/IGate';
import IVisit from '@/interfaces/IVisit';

export default interface IVisitsApplication {
  id?: string;
  division: IDivision;
  divisionId?: string;
  gate?: IGate;
  gateId?: string;
  formValue: IForm;
  formValueId?: string;
  withCar: boolean;
  visits: IVisit[];
  visitsForDelete: string[];

  getFileInfos: () => IFileInfo[];
  addVisit: () => void;
  removeVisit: (index: number) => void;
  changeWithCar: (value: boolean) => void;
}

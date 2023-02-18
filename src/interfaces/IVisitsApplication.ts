import Division from '@/classes/Division';
import Form from '@/classes/Form';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IGate from '@/interfaces/IGate';
import IVisit from '@/interfaces/IVisit';

export default interface IVisitsApplication {
  id?: string;
  division: Division;
  divisionId?: string;
  gate?: IGate;
  gateId?: string;
  formValue: Form;
  formValueId?: string;
  withCar: boolean;
  visits: IVisit[];
  visitsForDelete: string[];

  getFileInfos: () => IFileInfo[];
  addVisit: () => void;
  removeVisit: (index: number) => void;
  changeWithCar: (value: boolean) => void;
}

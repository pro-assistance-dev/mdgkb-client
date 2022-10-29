import IForm from '@/interfaces/IForm';
import IVisitsApplication from '@/interfaces/IVisitsApplication';

export default interface IGate {
  id?: string;
  name: string;
  num: number;
  visitsApplications: IVisitsApplication[];

  formPattern: IForm;
  formPatternId?: string;

  getBuildingNumber: () => string;
  getEntranceNumber: () => string;
}

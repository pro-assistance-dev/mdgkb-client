import IVisitsApplication from './IVisitsApplication';

export default interface IVisit {
  id?: string;
  date?: Date;
  entered?: boolean;
  exited?: boolean;

  visitsApplication: IVisitsApplication;
  visitsApplicationId?: string;
}

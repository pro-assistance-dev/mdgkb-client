import IApplicationCar from './IApplicationCar';

export default interface IVisit {
  id?: string;
  date?: Date;
  entered?: boolean;
  exited?: boolean;

  applicationCar: IApplicationCar;
  applicationCarId?: string;
}

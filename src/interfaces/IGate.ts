import IApplicationCar from '@/interfaces/IApplicationCar';

export default interface IGate {
  id?: string;
  name: string;
  applicationsCars: IApplicationCar[];
}

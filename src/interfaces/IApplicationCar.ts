import IDivision from '@/interfaces/buildings/IDivision';
import IGate from '@/interfaces/IGate';
import IUser from '@/interfaces/IUser';

export default interface IApplicationCar {
  id?: string;
  carNumber: string;
  carBrand: string;
  divisionId?: string;
  division?: IDivision;
  gateId?: string;
  gate?: IGate;
  userId?: string;
  user: IUser;
  date: Date;
  movedIn: boolean;
  movedOut: boolean;
}
